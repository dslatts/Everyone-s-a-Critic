import React from 'react';

export default function Toolbox(props){
  let colors = ['#DD4842', '#3EB8F1', '#C94DAB', '#614238',
                '#F2D665', '#BCE16E', '#343AC5', '#211B22'];
  let brushSizes = [2, 10, 25, 50, 70];
  let swatchSize = '75px';

  return (
    <div id={'toolbar'}>
      <div id={'colorBar'}>
        {colors.map(color => (<div
          key={color}
          onClick={props.changeColor}
          style={{display: 'inline-block',
                  height: swatchSize, width: swatchSize,
                  backgroundColor: color}}
            />)
        )}
      </div>
      <div id="toolButtons">
        <button onClick={props.clearCanvas}> CLEAR </button>
        <button className={props.erase} onClick={props.toggleEraser}> ERASER </button>
      </div>
      <div id="brushes">
        {brushSizes.map((brush, i) => (<button
          className={(props.selectedSize === brush + '') ? 'selectedBrush' : 'brush'}
          key={brush}
          onClick={props.changeBrushSize}
          value={brush}>
            {i + 1}
          </button>)
        )}
      </div>
    </div>
  );
}
