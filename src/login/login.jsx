import React from 'react';

export function Login() {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div>
        <h1 className="banner">Welcome to Tagster!</h1>
            <div className="Login">
                <form action="passwords.html" method="post">
                    <p>Username</p>
                    <div className="textbox">
                        <input type="text"/>
                    </div>
                    <p>Password</p>
                    <div className="textbox">
                        <input type="password"/>
                    </div>
                    <br/>
                <button type="submit" className="loginbutton">Login</button>
                </form>
            </div>
      </div>
    </main>
  );
}