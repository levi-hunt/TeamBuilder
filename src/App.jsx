import { useState } from "react";
import "./App.css";

const SearchForm = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchValue}/`
    );
    const data = await response.json();
    onSearch(data);
    setSearchValue("");
  };

  return (
    <div className="SearchForm">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </label>
        <button type="submit">Add to team</button>
      </form>
    </div>
  );
};

const PokemonCard = ({ data }) => {
  return (
    <div className="PokemonCard">
      <p>ID: {data.id}</p>
      <i className="fa-solid fa-xmark"></i>
      <h4>{data.name.toUpperCase()}</h4>
      <img src={data.sprites.front_default} />
      <div className="typeWrapper">
        {data.types.map((pkmnType) => (
          <span
            key={pkmnType.type.name}
            className={`type ${pkmnType.type.name}`}
          >
            {pkmnType.type.name.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
};

const PokemonWrapper = ({ pokemonTeam }) => {
  return (
    <div className="PokemonWrapper">
      {pokemonTeam.map((result, index) => (
        <PokemonCard key={index} data={result} />
      ))}
    </div>
  );
};

function App() {
  const [pkmnTeam, setPkmnTeam] = useState([]);

  const handleSearch = (data) => {
    if (pkmnTeam.length >= 6) {
      alert("Team is full!");
    } else {
      setPkmnTeam([...pkmnTeam, data]);
    }
  };

  return (
    <div className="App">
      {<SearchForm onSearch={handleSearch} />}
      {<PokemonWrapper pokemonTeam={pkmnTeam} />}
    </div>
  );
}

export default App;
