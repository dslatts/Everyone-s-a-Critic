import React from 'react';


export default function Waiting (props) {
  return (
    <div>
      { props.host ? <h1> {props.room} </h1> : <h1> Waiting for other players </h1> }
    </div>
  )
}
