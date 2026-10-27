import React from 'react'
import "./style.css"

export default function card(props) {
  return (
    <card className="Card">
        <img src={props.image} className='cardImg'/>
        <h1>{props.name}</h1>
        <p>{props.description}</p>
        <span className='prix'>{props.prix} DH</span> <br />
        <button className='buy'>Acheter</button>
    </card>
  )
}
