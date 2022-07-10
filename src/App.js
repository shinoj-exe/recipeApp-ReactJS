import './App.css';
import Recipe from './Recipe';
import React,{useEffect,useState} from 'react';

const App = () =>{
  const APP_ID='392b2c65';
  const APP_KEY='8a00c11ace6e926718f784020dd0bdbe'

  const [recipes,setRecipes]=useState([]);

  const [search,setSearch]=useState('');

  const [query,setQuery]=useState('chicken')

  useEffect( ()=>{
    getRecipes();
  },[query]);

  const getRecipes= async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits)
  };

  const updateSearch = e =>{
    setSearch(e.target.value);
  }
  
  const getSearch=e=>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className='search-form'>
        <input type="text" name="" className='search-bar' value={search} onChange={updateSearch} id=""/>
        <button type="submit" className='search-button' >Search</button>
      </form>
        <div className='recipes'>
          {recipes.map(recipe =>(
            <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            />
          ))}
        </div>
    </div>
  )

}

export default App;
