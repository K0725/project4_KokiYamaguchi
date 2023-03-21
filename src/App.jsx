import react from 'react'
import './App.css'
import Recipe from './components/recipe'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Recipe Search</h1>
      </header>
      <main>
        <Recipe />
      </main>
    </div>
  );
}
  
export default App;