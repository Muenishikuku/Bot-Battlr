import React from 'react'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaHeart } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";
import { FaPersonMilitaryRifle } from "react-icons/fa6";
import { BsFillLightningFill } from "react-icons/bs";


function Home() {
    // console.log(bots)
    const [bots, setBots] = useState([]);
    const [army, setArmy] = useState([]);

    //fetch data from endpoints
    useEffect(() => {
      fetch('https://bot-battlr-m6mu.onrender.com/bots')
        .then(response => response.json())
        .then(data => setBots(data));
  
      fetch('https://bot-battlr-m6mu.onrender.com/army')
        .then(response => response.json())
        .then(data => setArmy(data));
    }, []);

    //Card to hold the whole bot army
    const cards= bots.map((bot)=> {
      return (
          <Col key={bot.id} xs={12} sm={6} md={4} lg={3} xl={2} onClick={()=> handleClickDelete(bot)}>
            <Card >
              <Card.Img src={bot.avatar_url} />
              <Card.Body>
                <Card.Text>
                 Name: {bot.name}
                </Card.Text>
                <Card.Text>
                Class: {bot.bot_class}
                </Card.Text>
                <Card.Text>
                  <div className="icon-value">
                    {bot.health > 0 ? <FaHeart /> : <FaHeartBroken />} {bot.health}
                  </div>
                  <div className="icon-value">
                    {bot.damage > 0 ? <BsFillLightningFill />: <FaHeartBroken /> } {bot.damage}
                  </div>
                  <div className="icon-value">
                    {bot.armor > 0 ? <FaPersonMilitaryRifle /> : <FaHeartBroken />} {bot.armor}
                  </div>
                </Card.Text>
                </Card.Body>
            </Card>
          </Col>
      )
  }) 

  const armyCard= army.map((bot)=> {
    return (
        <Col key={bot.id} xs={12} sm={6} md={4} lg={3} xl={2}onClick={()=> handleArmyDlete(bot)}>
          <Card >
            <Card.Img src={bot.avatar_url} />
            <Card.Body>
              <Card.Text>
              Name: {bot.name}
              </Card.Text>
              <Card.Text>
                Class: {bot.bot_class}
              </Card.Text>
              <Card.Text>
                <div className="icon-value">
                  {bot.health > 0 ? <FaHeart /> : <FaHeartBroken />} {bot.health}
                </div>
                <div className="icon-value">
                  {bot.damage > 0 ? <BsFillLightningFill />: <FaHeartBroken /> } {bot.damage}
                </div>
                <div className="icon-value">
                  {bot.armor > 0 ? <FaPersonMilitaryRifle /> : <FaHeartBroken />} {bot.armor}
                </div>
              </Card.Text>
              </Card.Body>
          </Card>
        </Col>
    )
}) 

  async function handleClickDelete(clickedBot){
    await fetch(`https://bot-battlr-m6mu.onrender.com/bots/${clickedBot.id}`, {
      method: 'DELETE',
    })
      .then(response =>{
        const formattedBot = {
          id: clickedBot.id,
          name: clickedBot.name,
          health: clickedBot.health,
          damage: clickedBot.damage,
          armor: clickedBot.armor,
          bot_class: clickedBot.bot_class,
          catchphrase: clickedBot.catchphrase,
          avatar_url: clickedBot.avatar_url,
          created_at: clickedBot.created_at,
          updated_at: clickedBot.updated_at,
        }; 
      // .then(deletedBot => {
        // console.log(deletedBot)
        
        // Add the deleted bot to Army
       fetch('https://bot-battlr-m6mu.onrender.com/army', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedBot),
        })
          .then(response => response.json())
          .then(addedBot => {
            // Update state to reflect the changes in Bots and Army
            setBots(bots.filter(bot => bot.id !== clickedBot.id));
            setArmy(prevArmy=> [...prevArmy.filter(bot => bot.id !== clickedBot.id), addedBot]);
            // setArmy(prevArmy=> [...prevArmy.filter(bot => bot.id !== clickedBot.id),addededBot]);
          });
      });
  }
  //function to handle delete army
  async function handleArmyDlete(clickedBot){
    await fetch(`https://bot-battlr-m6mu.onrender.com/army/${clickedBot.id}`, {
      method: 'DELETE',
    })
      .then(response =>{
        const formattedBot = {
          id: clickedBot.id,
          name: clickedBot.name,
          health: clickedBot.health,
          damage: clickedBot.damage,
          armor: clickedBot.armor,
          bot_class: clickedBot.bot_class,
          catchphrase: clickedBot.catchphrase,
          avatar_url: clickedBot.avatar_url,
          created_at: clickedBot.created_at,
          updated_at: clickedBot.updated_at,
        }; 
      // .then(deletedBot => {
        // console.log(deletedBot)
        
        // Add the deleted bot to Army
        fetch('https://bot-battlr-m6mu.onrender.com/bots', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedBot),
        })
          .then(response => response.json())
          .then(addedBot => {
            // Update state to reflect the changes in Bots and Army
            setArmy(prevArmy => prevArmy.filter(bot => bot.id !== clickedBot.id));
            setBots(prevBots => [...prevBots, addedBot]);
            // setArmy(prevArmy=> [...prevArmy.filter(bot => bot.id !== clickedBot.id),addededBot]);
          });
      });
  }

  return (
    <div className='mt-4'>
      <div className='bg-green-300 mb-5'>
        <h3 className='bg-white'>Chosen Army</h3>
        <Row>
          {armyCard}
        </Row>
      </div>
      <div >
        <h3 >Bot Army</h3>
        <Row>
          {cards}
        </Row>
      </div>
        
          
        
    </div>
  )
}

export default Home