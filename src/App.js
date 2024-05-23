import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthWrapper } from './contexts/AuthWrapper';
import ModelProvider  from './contexts/ModelProvider';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <ModelProvider>
            <AuthWrapper />
          </ModelProvider>
      </BrowserRouter>      
    </div>
  );
}

export default App;
