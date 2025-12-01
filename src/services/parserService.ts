import { ParsedWebsiteData, SmartPasteResult } from '../types';

export class ParserService {
  /**
   * Smart parser that handles multiple input formats:
   * - CSV (with or without headers)
   * - JSON array
   * - Plain text (one per line or comma-separated)
   * - Tab-separated values
   * - Mixed formats
   */
  static parseSmartPaste(input: string): SmartPasteResult {
    const result: SmartPasteResult = {
      parsed: [],
      errors: [],
      totalParsed: 0,
      format: 'text'
    };

    if (!input.trim()) {
      result.errors.push('Empty input');
      return result;
    }

    // Try JSON first
    if (input.trim().startsWith('[') || input.trim().startsWith('{')) {
      try {
        const jsonResult = this.parseJSON(input);
        result.parsed = jsonResult;
        result.format = 'json';
        result.totalParsed = jsonResult.length;
        return result;
      } catch (error) {
        result.errors.push('Invalid JSON format, trying other formats...');
      }
    }

    // Try CSV
    if (input.includes(',') || input.includes('\t')) {
      const csvResult = this.parseCSV(input);
      if (csvResult.length > 0) {
        result.parsed = csvResult;
        result.format = 'csv';
        result.totalParsed = csvResult.length;
        return result;
      }
    }

    // Try plain text (line by line)
    const textResult = this.parseText(input);
    if (textResult.length > 0) {
      result.parsed = textResult;
      result.format = 'text';
      result.totalParsed = textResult.length;
      return result;
    }

    result.errors.push('Could not parse input. Please check format.');
    return result;
  }

  private static parseJSON(input: string): ParsedWebsiteData[] {
    const data = JSON.parse(input);
    const array = Array.isArray(data) ? data : [data];
    
    return array.map((item, index) => {
      if (typeof item === 'string') {
        return this.parseTextLine(item, index);
      }
      
      return {
        websiteName: item.websiteName || item.name || item.website || `Website ${index + 1}`,
        websiteDescription: item.websiteDescription || item.description || item.desc || '',
        detectedCategory: item.category,
      };
    });
  }

  private static parseCSV(input: string): ParsedWebsiteData[] {
    const lines = input.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];

    const delimiter = input.includes('\t') ? '\t' : ',';
    const firstLine = lines[0].toLowerCase();
    
    // Check if first line is header
    const hasHeader = firstLine.includes('name') || firstLine.includes('description') || firstLine.includes('website');
    const dataLines = hasHeader ? lines.slice(1) : lines;

    return dataLines.map((line, index) => {
      const parts = line.split(delimiter).map(p => p.trim().replace(/^["']|["']$/g, ''));
      
      if (parts.length === 1) {
        return this.parseTextLine(parts[0], index);
      }

      return {
        websiteName: parts[0] || `Website ${index + 1}`,
        websiteDescription: parts[1] || parts[0] || '',
        detectedCategory: parts[2],
      };
    });
  }

  private static parseText(input: string): ParsedWebsiteData[] {
    const lines = input.split('\n').filter(line => line.trim());
    
    return lines.map((line, index) => this.parseTextLine(line, index));
  }

  private static parseTextLine(line: string, _index: number): ParsedWebsiteData {
    // Try to detect patterns like "Name - Description" or "Name: Description"
    const separators = [' - ', ': ', ' | ', ' -- '];
    
    for (const sep of separators) {
      if (line.includes(sep)) {
        const [name, ...descParts] = line.split(sep);
        return {
          websiteName: name.trim(),
          websiteDescription: descParts.join(sep).trim(),
        };
      }
    }

    // If no separator found, use the whole line as name
    return {
      websiteName: line.trim(),
      websiteDescription: `Content and information about ${line.trim()}`,
    };
  }

  /**
   * Validates parsed data and provides suggestions
   */
  static validateParsedData(data: ParsedWebsiteData[]): { valid: ParsedWebsiteData[]; invalid: { data: ParsedWebsiteData; reason: string }[] } {
    const valid: ParsedWebsiteData[] = [];
    const invalid: { data: ParsedWebsiteData; reason: string }[] = [];

    data.forEach(item => {
      if (!item.websiteName || item.websiteName.length < 2) {
        invalid.push({ data: item, reason: 'Website name too short' });
      } else if (!item.websiteDescription || item.websiteDescription.length < 10) {
        invalid.push({ data: item, reason: 'Description too short (min 10 characters)' });
      } else {
        valid.push(item);
      }
    });

    return { valid, invalid };
  }

  /**
   * Generates example formats for user guidance
   */
  static getExampleFormats(): { [key: string]: string } {
    return {
      'CSV Format': `TechBlog,Technology news and reviews
FitnessHub,Health and fitness tips for beginners
StartupTools,Essential tools for entrepreneurs`,
      
      'Tab-Separated': `TechBlog\tTechnology news and reviews
FitnessHub\tHealth and fitness tips for beginners
StartupTools\tEssential tools for entrepreneurs`,
      
      'With Separator': `TechBlog - Technology news and reviews
FitnessHub: Health and fitness tips for beginners
StartupTools | Essential tools for entrepreneurs`,
      
      'JSON Format': `[
  {"websiteName": "TechBlog", "websiteDescription": "Technology news and reviews"},
  {"websiteName": "FitnessHub", "websiteDescription": "Health and fitness tips"}
]`,
      
      'Simple List': `TechBlog
FitnessHub
StartupTools`
    };
  }
}
