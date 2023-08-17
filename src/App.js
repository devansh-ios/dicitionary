import "./App.css";
import { useState } from "react"; 

function App() {
  const [word, setWord] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  const searchHandler = async () => {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}` 
    );
    const data = await res.json();
if(!res.ok){
  alert(" word didn't found")
}
    setWord(data);
    
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value); 
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="enter the word"
        value={searchTerm}
        onChange={handleInputChange} 
      />
      <br />
      <button onClick={searchHandler}>Search</button>
      <div>
      {word.map((entry, index) => (
        <div key={index}>
          <h2>{entry.word}</h2>
          {entry.meanings.map((meaning, meaningIndex) => (
            <div key={meaningIndex}>
              <h3>Part of Speech: {meaning.partOfSpeech}</h3>
              <ul>
                {meaning.definitions.map((definition, defIndex) => (
                  <li key={defIndex}>{definition.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
      </div>
  );
}

export default App;
