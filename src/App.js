import Home from './pages/Home';
import Header from './components/Header';
import { AppProvider } from './contexts/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Header />
        <Home />
      </div>
    </AppProvider>
  );
}

export default App;
