import React from 'react';
import { useNavigate } from 'react-router-dom';

function BotCollection({ botsArray, setBotsArray, favouriteBots, setFavouriteBots }) {
  const navigate = useNavigate();

  function addToFavoritesHandler(event) {
    const botId = parseInt(event.target.id);
    const draftedBot = botsArray.find((bot) => bot.id === botId);
    const isBotAlreadyAdded = favouriteBots.some((bot) => bot.id === botId);
    if (!isBotAlreadyAdded) {
      setFavouriteBots([...favouriteBots, draftedBot]);
    } else {
      console.log('Already in favorites');
    }
  }

  function navigateToDetails(id) {
    navigate(`/details/${id}`);
  }

  async function deleteBot(botToDelete) {
    try {
      const url = `https://bot-data-1lv2.onrender.com/bots/${botToDelete.id}`;
      const method = {
        method: 'DELETE',
      };

      await fetch(url, method);
      const deleteArray = botsArray.filter((bot) => botToDelete.id !== bot.id);
      setBotsArray(deleteArray);
    } catch (error) {
      console.error('Error deleting bot:', error);
    }
  }

  const botCards = botsArray.map((bot) => (
    <div className='card col-3 bg-secondary' id='card-bot' key={bot.id}>
      <img src={bot.avatar_url} className='card-img-top' alt='Loading...' />
      <div className='card-body'>
        <h3 className='card-title'>{bot.name}</h3>
        <p className='card-text'>{bot.catchphrase}</p>
        <h4>
          &#128147;{bot.health} &#128737;{bot.armor} &#9889;{bot.damage}
        </h4>
        <button onClick={addToFavoritesHandler} className='btn btn-info' id={bot.id}>
          Enlist
        </button>
        <button onClick={() => navigateToDetails(bot.id)} className='btn btn-primary' id={bot.id}>
          Details
        </button>
        <button onClick={() => deleteBot(bot)} className='btn btn-danger' id={bot.id}>
          X
        </button>
      </div>
    </div>
  ));

  return (
    <div className='col-12 border border-primary bg-success'>
      <div className='row'>{botCards}</div>
    </div>
  );
}

export default BotCollection;
