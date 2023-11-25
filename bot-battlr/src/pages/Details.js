import React from 'react'
import {NavLink, useParams } from 'react-router-dom'

function Details({botsArray,favouriteBots,setFavouriteBots}) {
  const { id } = useParams();
  const bot = botsArray.find((bot) => bot.id === parseInt(id));
  function addToFavourites(event){
    const botId = parseInt(event.target.id);
    const draftedBot=botsArray.find((bot) =>  bot.id===botId)
    const isBotAlreadyAdded = favouriteBots.some((bot) => bot.id === botId);
    !isBotAlreadyAdded?
    setFavouriteBots([...favouriteBots, draftedBot]):console.log('Already in favourites');
    event.target.classList.add("clicked");
  }
  
  return (
    <div>
      <h1>DETAILS</h1>
      <div className='card col-2 bg-secondary' key={bot.id}>
      <img src={bot.avatar_url} className="card-img-top" alt="Loading..."/>
        <div className="card-body" >
            <h3 className="card-title">Name: {bot.name}</h3>
            <p className="card-text"><strong>Catchphrase</strong>: <br/>{bot.catchphrase}</p>
            <h3>Class: {bot.bot_class}&#9992;</h3>
            <h4>&#128147;{bot.health} &#128737;{bot.armor} &#9889;{bot.damage}</h4>
            <button 
            onClick={addToFavourites}
            className="btn btn-danger"
            id={bot.id}
            >  Enlist  
            </button>
            <br/>
            <button 
            className="btn btn-info"
            id={bot.id}
            ><NavLink exact to='../'>Go Back</NavLink>
            </button>
        </div>
    </div>


     
    </div>
  )
}

export default Details