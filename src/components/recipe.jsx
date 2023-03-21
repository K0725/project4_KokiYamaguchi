import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Recipe = () => {
  const [recipeData, setRecipeData] = useState(null);
  const [bannedAttributes, setBannedAttributes] = useState([]);
  const [history, setHistory] = useState([]);
  const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  const APP_ID = import.meta.env.VITE_APP_API_ID;

  useEffect(() => {
    fetchRecipe();
  }, [bannedAttributes]);


  const AttributeButton = ({ attribute, onClick }) => {
    return (
      <button className="attribute-button" onClick={() => onClick(attribute)}>
        {attribute}
      </button>
    );
  };
  

  const fetchRecipe = async () => {
    try {
      const response = await axios.get('https://api.edamam.com/search', {
        params: {
          q: 'random',
          app_id: APP_ID,
          app_key: API_KEY,
          excluded: bannedAttributes.join(','),
        },
      });
  
      const randomIndex = Math.floor(Math.random() * response.data.hits.length);
      const recipe = response.data.hits[randomIndex].recipe;
      setRecipeData(recipe);
      setHistory((prev)=> [...prev, recipe]);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  const addToBanList = (attribute) => {
    if (!bannedAttributes.includes(attribute)) {
      setBannedAttributes([...bannedAttributes, attribute]);
    }
  };

  
  


  return (
    <div className="App">
        <div className="history_panel">
            <br />
                <h3>History</h3>
                    {history &&
                    history.map((recipe, key) => (
                    <div className="" key={key}>
                    <p>{recipe.label}</p>
                    <img src={recipe.image} style={{ width: "100px" }} />
                    </div>
                ))}
        </div>

      <button onClick={fetchRecipe}>Discover</button>
      {recipeData && (
        <>
          <h2>{recipeData.label}</h2>
          <div className="image-container">
            <img src={recipeData.image} alt={recipeData.label} />
          </div>
          <div className="attributes-container">
            {recipeData.cuisineType &&
              !bannedAttributes.includes(recipeData.cuisineType) && (
                <AttributeButton
                  attribute={recipeData.cuisineType}
                  onClick={addToBanList}
                />
              )}
            {recipeData.dishType &&
              recipeData.dishType
                .filter((dish) => !bannedAttributes.includes(dish))
                .slice(0, 1)
                .map((dish, index) => (
                  <AttributeButton
                    key={index}
                    attribute={dish}
                    onClick={addToBanList}
                  />
                ))}
            {recipeData.mealType &&
              recipeData.mealType
                .filter((meal) => !bannedAttributes.includes(meal))
                .slice(0, 1)
                .map((meal, index) => (
                  <AttributeButton
                    key={index}
                    attribute={meal}
                    onClick={addToBanList}
                  />
                ))}
          </div>
        </>
      )}
      <div className="banlist">
        <h3>Banned attributes:</h3>
        <ul>
          {bannedAttributes.map((attribute, index) => (
            <li key={index}>{attribute}</li>
          ))}
        </ul>
      </div>
    </div>
  );
  
};

export default Recipe;