import React from 'react';

export function Add() {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div>
        <h3>Friend's Username</h3>
            <form action="add.html" className="textbox" method="post">
                <input type="text"> </input>
                <button type="submit" className="loginbutton">Add</button>
            </form>
        </div>
    </main>
  );
}