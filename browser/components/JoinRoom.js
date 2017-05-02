import React from 'react';
export default function Login (props) {
  return (
    <div>
      <form onSubmit={props.handlePlay}>
        <fieldset>
          <label htmlFor="roomNum"> Room Code </label>
          <input
          type="text" id="roomNum"
          name="roomForm"
          maxLength="4"
          value={props.roomval}
          onChange={props.handleChange}
          />
          <label htmlFor="usrName" > Your Name </label>
          <input
          type ="text" id="usrName"
          name="nameForm"
          value={props.nameval}
          onChange={props.handleChange} />
        </fieldset>
        <button type="submit"> Play </button>
      </form>
      <button onClick={props.handleBack}> Back </button>
    </div>
  );
}
