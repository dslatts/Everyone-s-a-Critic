import React from 'react';

export default function Toolbox(props){
  let colors = ['#DE6161', '#3EB0F1', '#E174D0', '#F6F6E6',
                '#EBC35B', '#BCE16E', '#4E53C8', '#3A2B3D'];
  let size = '75px';

  return (
    <div>
    Colors:
      { colors.map(color => <div
        key={color}
        onClick={props.changeColor}
        style={{display: 'inline-block',
                height: size, width: size,
                backgroundColor: color}}
          />
        )}
      <button onClick={props.clearCanvas}> CLEAR </button>
    </div>
  )
}
