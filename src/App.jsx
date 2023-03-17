import { useState } from 'react'
import './App.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const SearchForm = ( {onSearch} ) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}/`);
    const data = await response.json();
    onSearch(data);
    setSearchValue('');
  }

  return (
    <div className='SearchForm'>
      <form onSubmit={handleSubmit}>
        <label>
          <input 
            type='text'
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </label>
        <button type='submit'>Add to team</button>
      </form>
    </div>
  )
}

const PokemonCard = ( {data} ) => {
  return (
    <div className='PokemonCard'>
      <p>ID: {data.id}</p>
      <i className="fa-solid fa-xmark"></i>
      <h4>{data.name.toUpperCase()}</h4>
      <img src={data.sprites.front_default}/>
    </div>
  )
}

const PokemonWrapper = ( {pokemonTeam} ) => {
  return (
    <div className='PokemonWrapper'>
      {pokemonTeam.map((result, index) => (
        <PokemonCard key={index} data={result} />
      ))}
    </div>
  )
}


function App() {
  const [pkmnTeam, setPkmnTeam] = useState([]);

  const handleSearch = (data) => {
    setPkmnTeam([...pkmnTeam, data]);
  }

  return (
    <div className="App">
      {<SearchForm onSearch={handleSearch}/>}
      {<PokemonWrapper pokemonTeam={pkmnTeam}/>}
    </div>
  )
}

export default App
