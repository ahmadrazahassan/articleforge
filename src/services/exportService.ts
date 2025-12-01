import { GeneratedArticle, ExportFormat } from '../types';

export class ExportService {
  static exportArticle(article: GeneratedArticle, format: ExportFormat): void {
    // Use article title as filename, sanitized for file system
    const sanitizedTitle = article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 100); // Limit filename length
    
    const filename = sanitizedTitle || article.slug;

    switch (format) {
      case 'html':
        this.downloadFile(article.htmlArticle, `${filename}.html`, 'text/html');
        break;
      case 'markdown':
        this.downloadFile(this.convertToMarkdown(article), `${filename}.md`, 'text/markdown');
        break;
      case 'json':
        this.downloadFile(JSON.stringify(article, null, 2), `${filename}.json`, 'application/json');
        break;
      case 'wordpress':
        this.downloadFile(this.convertToWordPress(article), `${filename}-wordpress.xml`, 'application/xml');
        break;
      case 'pdf-ready':
        this.downloadFile(this.convertToPDFReady(article), `${filename}-pdf.html`, 'text/html');
        break;
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  static exportBulk(articles: GeneratedArticle[], format: ExportFormat): void {
    if (format === 'json') {
      this.downloadFile(
        JSON.stringify(articles, null, 2),
        `bulk-export-${Date.now()}.json`,
        'application/json'
      );
    } else {
      // Create a zip-like structure (simplified - in production use JSZip)
      const combined = articles.map(article => {
        return `\n\n${'='.repeat(80)}\n${article.title}\n${'='.repeat(80)}\n\n${
          format === 'markdown' ? this.convertToMarkdown(article) : article.htmlArticle
        }`;
      }).join('\n');
      
      this.downloadFile(
        combined,
        `bulk-export-${Date.now()}.${format === 'markdown' ? 'md' : 'html'}`,
        format === 'markdown' ? 'text/markdown' : 'text/html'
      );
    }
  }

  private static convertToMarkdown(article: GeneratedArticle): string {
    let markdown = `# ${article.title}\n\n`;
    markdown += `**Category:** ${article.category}\n\n`;
    markdown += `**Tags:** ${article.tags.join(', ')}\n\n`;
    markdown += `**Meta Description:** ${article.metaDescription}\n\n`;
    markdown += `**Focus Keywords:** ${article.focusKeywords.join(', ')}\n\n`;
    markdown += `---\n\n`;
    
    // Convert HTML to Markdown (simplified)
    let content = article.htmlArticle
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
      .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
      .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
      .replace(/<ul[^>]*>|<\/ul>/gi, '\n')
      .replace(/<ol[^>]*>|<\/ol>/gi, '\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '');
    
    markdown += content;
    return markdown;
  }

  private static convertToWordPress(article: GeneratedArticle): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/">
  <channel>
    <title>Article Export</title>
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>https://yoursite.com/${article.slug}</link>
      <pubDate>${new Date(article.createdAt).toUTCString()}</pubDate>
      <dc:creator><![CDATA[admin]]></dc:creator>
      <category domain="category" nicename="${article.category.toLowerCase()}"><![CDATA[${article.category}]]></category>
      ${article.tags.map(tag => `<category domain="post_tag" nicename="${tag.toLowerCase()}"><![CDATA[${tag}]]></category>`).join('\n      ')}
      <guid isPermaLink="false">https://yoursite.com/?p=1</guid>
      <description><![CDATA[${article.metaDescription}]]></description>
      <content:encoded><![CDATA[${article.htmlArticle}]]></content:encoded>
      <excerpt:encoded><![CDATA[${article.metaDescription}]]></excerpt:encoded>
      <wp:post_name><![CDATA[${article.slug}]]></wp:post_name>
      <wp:status><![CDATA[draft]]></wp:status>
      <wp:post_type><![CDATA[post]]></wp:post_type>
    </item>
  </channel>
</rss>`;
  }

  private static convertToPDFReady(article: GeneratedArticle): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${article.title}</title>
  <style>
    @media print {
      body { margin: 0; padding: 20mm; }
      h1 { page-break-before: always; }
      h1:first-of-type { page-break-before: avoid; }
    }
    body {
      font-family: 'Georgia', serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 { font-size: 2.5em; margin-bottom: 0.5em; }
    h2 { font-size: 2em; margin-top: 1.5em; }
    h3 { font-size: 1.5em; margin-top: 1.2em; }
    p { margin: 1em 0; }
    ul, ol { margin: 1em 0; padding-left: 2em; }
    .metadata {
      background: #f5f5f5;
      padding: 15px;
      border-left: 4px solid #333;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="metadata">
    <p><strong>Category:</strong> ${article.category}</p>
    <p><strong>Tags:</strong> ${article.tags.join(', ')}</p>
    <p><strong>Generated:</strong> ${new Date(article.createdAt).toLocaleDateString()}</p>
  </div>
  ${article.htmlArticle}
</body>
</html>`;
  }

  private static downloadFile(content: string, filename: string, mimeType: string): void {
    try {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      
      // Trigger download
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error(`Error downloading file ${filename}:`, error);
      throw new Error(`Failed to download ${filename}`);
    }
  }
}
