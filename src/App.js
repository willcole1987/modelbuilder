import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthWrapper } from './contexts/AuthWrapper';
import ModelProvider  from './contexts/ModelProvider';
import NodeProvider  from './contexts/NodeProvider';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <NodeProvider>
              <ModelProvider>
                  <AuthWrapper />
              </ModelProvider>
            </NodeProvider>
      </BrowserRouter>      
    </div>
  );
}

export default App;
