import React from 'react'
import { useNavigate } from 'react-router-dom';

function BotCollection({botsArray, setBotsArray, favouriteBots, setFavouriteBots}) {
  const navigate=useNavigate()

  function addToFavourites(event){
    const botId = parseInt(event.target.id);
    const draftedBot=botsArray.find((bot) =>  bot.id===botId)
    const isBotAlreadyAdded = favouriteBots.some((bot) => bot.id === botId);
    !isBotAlreadyAdded?
    setFavouriteBots([...favouriteBots, draftedBot]):console.log('Already in favourites');
  }
  function navigateToHome(id){
      navigate(`/details/${id}`)
  }
  function deleteBot(botToDelete){
    const deleteArray=botsArray.filter((bot)=>botToDelete.id!==bot.id)
    console.log(botToDelete.id)
    deleteMethod(botToDelete)
    .then(() => {
      setBotsArray(deleteArray);
    })
    }
  function deleteMethod(bot){
      const url=`http://localhost:4000/bots/${bot.id}`;
      const method={
        method: "DELETE"
      }
      return fetch(url, method)
      .then(data=>data)
    }

  const botCards=botsArray.map((bot)=>(
    <div className='card col-3 bg-secondary' id="card-bot" key={bot.id}>
      <img src={bot.avatar_url} className="card-img-top" alt="Loading..."/>
        <div className="card-body" >
            <h3 className="card-title">{bot.name}</h3>
            <p className="card-text">{bot.catchphrase}</p>
            <h4>&#128147;{bot.health} &#128737;{bot.armor} &#9889;{bot.damage}</h4>
            <button 
            onClick={addToFavourites}
            className="btn btn-info"
            id={bot.id}
            > Enlist  
            </button>
            <button 
            onClick={() => navigateToHome(bot.id)}
            className="btn btn-primary"
            id={bot.id}
            >Details
            </button>
            <button 
            onClick={()=>deleteBot(bot)}
            className="btn btn-danger"
            id={bot.id}
            > X 
          </button>
        </div>
    </div>
))


  return (
    <div className='col-12 border border-primary bg-success'>
      <div className='row'>
        {botCards}
      </div>
    </div>
  )
}

export default BotCollection