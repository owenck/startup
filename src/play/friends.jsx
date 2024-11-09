import React from 'react';

function Message(friend, index) {
    if (friend.tagState) {
        return "Tag!";
    } else {
        return "Tagged";
    }
}

function StatusMessage(friend, index) {
    if (friend.tagState) {
        return "You're it!";
    } else {
        return "Tagged";
    }
}

export function Friends({userName, friends, increaseScore }) {
    return (
        <main className='container-fluid bg-secondary text-center'>
            <h1 className="banner">Welcome, {userName}</h1>
            <h3>Your Friends</h3>
            <div className="image-grid">
                {friends.length > 0 ? (
                    friends.map((friend, index) => (
                        <div key={index} className="grid-item">
                            <h5 className="name">{friend.name}</h5>
                            <img alt="friend name not found" src="doodleperson.jpg"/>
                            <div className="content">Tag Score: {friend.score} </div>
                            <div className="content">Tag Status: {StatusMessage(friend, index)} </div>
                            <button 
                            onClick={() => increaseScore(index)} 
                            type="button" 
                            className="tagbutton"
                            disabled={!friend.tagState}
                            >
                                {Message(friend, index)}
                            </button>
                        </div>
                    ))
                ) : (
                    <p>
                        No friends added yet.
                        <br/>
                        Add one with the + button!
                    </p>
                )}
            </div>
        </main>
    );
}