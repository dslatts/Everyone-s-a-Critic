import React from 'react';

const TitleScreen = (props) => {
  return (
    <div>
      <h1> Everyone's a Critic </h1>
      <button onClick={props.handleCreateGame}>Host New Game </button>
      <button onClick={props.handleJoinGame}> Join Existing Game </button>
    </div>
  );
}

export default TitleScreen
