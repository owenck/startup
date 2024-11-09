import React from 'react';

export function Friends({userName, friends }) {
    return (
        <main className='container-fluid bg-secondary text-center'>
            <h1 className="banner">Welcome, {userName}</h1>
            <h3>Your Friends</h3>
            <div className="image-grid">
                {friends.length > 0 ? (
                    friends.map((friend, index) => (
                        <div key={index} className="grid-item">
                            <h5 className="name">{friend}</h5>
                            <img alt="friend name not found" src="doodleperson.jpg"/>
                            <div className="content">Tag Score: Database Component</div>
                            <div className="content">Tag Status: Websocket Data</div>
                            <button type="submit" className="tagbutton">Tag!</button>
                        </div>
                    ))
                ) : (
                    <p>No friends added yet.</p>
                )}
            </div>
        </main>
    );
}