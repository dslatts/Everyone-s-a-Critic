import React from 'react';
import { findDOMNode } from 'react-dom';
import Rx from 'rx'; //condense this
import Toolbar from './Toolbar';

export default class Canvas extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      strokeColor: '#3A2B3D',
      strokeRadius: 7,
    }
    this.draw = this.draw.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.makeObservables = this.makeObservables.bind(this);
  }

  componentDidMount(){
    this.touchEnabled = 'ontouchstart' in window || navigator.msMaxTouchPoints;
    this.canvas = findDOMNode(this.canvasRef);
    this.ctx = this.canvas.getContext('2d');
    this.makeObservables();
  }

  draw(event){
    this.ctx.beginPath();
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = this.state.strokeColor;
    this.ctx.lineWidth = this.state.strokeRadius;
    this.ctx.moveTo(event.x2, event.y2);
    this.ctx.lineTo(event.x1, event.y1);
    this.ctx.stroke();
  }

  makeObservables(){
    let start = Rx.Observable.fromEvent(this.canvas, /*(this.touchEnabled ? 'touchstart' : */'mousedown')
    let move = Rx.Observable.fromEvent(this.canvas, /*(this.touchEnabled ? 'touchmove' : */'mousemove')
    let end = Rx.Observable.fromEvent(document, /*(this.touchEnabled ? 'touchend' : */'mouseup')

    let drawStream = start.flatMap(() => move.debounce(7).bufferWithCount(2, 1)
      .map(events => {
        return {x1: events[0].offsetX,
                x2: events[1].offsetX,
                y1: events[0].offsetY,
                y2: events[1].offsetY
              }
      })
      .takeUntil(end));

    drawStream.subscribe(this.draw);
  }

  clearCanvas(e){
    e.preventDefault();
    this.ctx.clearRect(0, 0, this.props.width, this.props.height);
  }

  changeColor(e){
    e.preventDefault();
    this.setState({strokeColor: e.target.style.backgroundColor})
  }

  render(){
    return (
    <div>
      <div className="toolBar">
      <Toolbar clearCanvas={this.clearCanvas} changeColor={this.changeColor} />
      </div>
      <canvas
        id="paintCanvas"
        ref={(canvas) => {this.canvasRef = canvas}}
        width={this.props.width}
        height={this.props.height}
        style={{border: '1px solid #000000'}}
      />
    </div>
    )
  }

}
