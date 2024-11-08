import React from 'react';

export function Friends() {
  return (
    <main className='container-fluid bg-secondary text-center'>
        <div>
            <h1 className="banner">Welcome, User</h1>

            <div className="image-grid">

                <div className = "grid-item">
                    <h5 className="name">Friend name</h5>
                    <img alt="friend 1" src="doodleperson.jpg"/>
                    <div className="content">Tag Score: Database Component</div>
                    <div className="content">Tag Status: Websocket Data</div>
                    <button type="submit" className="tagbutton">Tag!</button>
                </div>
                
                <div className = "grid-item">
                    <h5 className="name">Friend name</h5>
                    <img alt="friend 2" src="doodleperson.jpg"/>
                    <div className="content">Tag Score: Database Component</div>
                    <div className="content">Tag Status: Websocket Data</div>
                    <button type="submit" className="tagbutton">Tag!</button>
                </div>
                
                <div className = "grid-item">
                    <h5 className="name">Friend name</h5>
                    <img alt="friend 3" src="doodleperson.jpg"/>
                    <div className="content">Tag Score: Database Component</div>
                    <div className="content">Tag Status: Websocket Data</div>
                    <button type="submit" className="tagbutton">Tag!</button>
                </div>

                <div className = "grid-item">
                    <h5 className="name">Friend name</h5>
                    <img alt="friend 3" src="doodleperson.jpg"/>
                    <div className="content">Tag Score: Database Component</div>
                    <div className="content">Tag Status: Websocket Data</div>
                    <button type="submit" className="tagbutton">Tag!</button>
                </div>
            </div>
        </div>
    </main>
  );
}