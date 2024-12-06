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

async function getFriends() {
    try {
        // Use fetch to call the /api/friends endpoint
        const response = await fetch('/api/friends');

        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON data from the response
        const friends = await response.json();

        // Log the friends array or do something with it
        console.log('Friends List:', friends);
        return friends;

    } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Error fetching friends:', error);
    }
}

export function Friends({ userName, friends, increaseScore }) {
    const [friendImages, setFriendImages] = React.useState([]);

    React.useEffect(() => {
        // Fetch random images for each friend
        const fetchImages = async () => {
            try {
                const imagePromises = friends.map(() =>
                    fetch('https://picsum.photos/200').then((response) => response.url)
                );
                const images = await Promise.all(imagePromises);
                setFriendImages(images); // Store all the fetched images
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [friends]);

    return (
        <main className="container-fluid bg-secondary text-center">
            <h1 className="banner">Welcome, {userName}</h1>
            <h3>Your Friends</h3>
            <div className="image-grid">
                {friends.length > 0 ? (
                    friends.map((friend, index) => (
                        <div key={index} className="grid-item">
                            <h5 className="name">{friend.name}</h5>
                            <img
                                alt={`Profile of ${friend.name}`}
                                src={friendImages[index] || 'https://via.placeholder.com/200'} // Fallback if image not loaded
                            />
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
                        <br />
                        Try adding one with the + button!
                    </p>
                )}
            </div>
        </main>
    );
}