import Router from './Router';
import { ToastProvider } from './components/ToastContainer';

function App() {
  return (
    <ToastProvider>
      <Router />
    </ToastProvider>
  );
}

export default App;
