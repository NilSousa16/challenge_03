import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {    
    api.get('/repositories').then(response => {      
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      "title" : `Desafio REACTJS - ${Date.now()}`,
      "url" : "http://github.com/...",
      "techs" : ["Node.js", "Vue.js", "Angular.js"]
    });

    const repository = response.data;
    
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    /**
     * The filter() method creates an array filled with all array elements that pass a test (provided as a function).
     */
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {
        repositories.map(repository => <li key={repository.id}>          
          <div className="details">
            <span className="titleDetails">{repository.title}</span>
            <span className="urlDetails">{repository.url}</span>
            <span className="techsDetails">{repository.techs}</span>

            <button className="buttonDetails" onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </div>          
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
