import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');

  const fetchDefinition = async () => {
    const response = await axios.get(`api/define`, { params: { word } });
    setDefinition(response.data.definition);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDefinition();
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
        
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter a word"
            />
            <button type="submit">Get Definition</button>
          </form>
        </div>
        <p>{definition}</p>
      </header>
    </div>
  );
}

export default App;
