import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaHeart } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";
import { FaPersonMilitaryRifle } from "react-icons/fa6";

function Army() {
    const [armys , setArmy]= useState([])
    useEffect(()=>{
        fetch(" http://localhost:3000/army")
        .then((res)=> res.json())
        .then((data)=> setArmy(data))
    }, [])
    // console.log(army)

    const cards= armys.map((army)=> {
        return (
            <Col key={army.id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Card>
                <Card.Img src={army.avatar_url} />
                <Card.Body>
                  <Card.Text>
                    {army.catchphrase}
                  </Card.Text>
                  <Card.Text>
                    <div className="icon-value">
                      {army.health > 0 ? <FaHeart /> : <FaHeartBroken />} {army.health}
                    </div>
                    <div className="icon-value">
                      {army.damage > 0 ? <FaHeartBroken />: <FaHeart /> } {army.damage}
                    </div>
                    <div className="icon-value">
                      {army.armor > 0 ? <FaPersonMilitaryRifle /> : <FaHeartBroken />} {army.armor}
                    </div>
                  </Card.Text>
                  </Card.Body>
              </Card>
            </Col>
        )
    }) 
  return (
    <div className='bg-red-100'>
    <h3 className='bg-white'>Chosen Army</h3>
        <Row>
          {cards}
        </Row>
    </div>
  )
}

export default Army