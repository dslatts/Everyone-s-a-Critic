import React from 'react';
export default function Login (props) {
  return (
    <div>
      <form>
        <fieldset>
          <label htmlFor="roomNum"> Room Code </label>
          <input type ="text" id="roomNum" maxLength="4" />
          <label htmlFor="usrName"> Your Name </label>
          <input type ="text" id="usrName" />
        </fieldset>
        <button type="submit"> Play </button>
      </form>
      <button onClick={props.handleBack}> Back </button>
    </div>
  );
}
