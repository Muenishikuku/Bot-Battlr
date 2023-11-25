import React from 'react'
import YourBotArmy from './YourBotArmy';
import BotCollection from './BotCollection';

function Home({botsArray, setBotsArray, favouriteBots, setFavouriteBots}) {
   
    return (
      <div className="container">
         <YourBotArmy 
         favouriteBots={favouriteBots}
         setFavouriteBots={setFavouriteBots}/>
         <BotCollection 
         botsArray={botsArray} 
         setBotsArray={setBotsArray} 
         favouriteBots={favouriteBots} 
         setFavouriteBots={setFavouriteBots}/>
      </div>
    );
  }
  
  export default Home;
