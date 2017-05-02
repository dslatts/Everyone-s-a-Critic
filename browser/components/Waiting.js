import React from 'react';


export default function Waiting (props) {
  return (
    <div>
      { props.host ? <div><h1> {props.room}</h1><h1> {props.users.toString()} </h1></div> : <h1> Waiting for other players </h1> }
    </div>
  )
}
