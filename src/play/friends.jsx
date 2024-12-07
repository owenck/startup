import React from 'react';

// Your existing functions
function Message(friend) {
    return friend.tagState ? "Tag!" : "Tagged";
}

function StatusMessage(friend) {
    return friend.tagState ? "You're it!" : "Tagged";
}


async function fetchFriendsData(friendUsernames) {
    try {
      const response = await fetch('/api/friends/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendUsernames }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const friendsData = await response.json();
      return friendsData;
    } catch (error) {
      console.error('Error fetching friends data:', error);
      return [];
    }
}

export function Friends({ userName, increaseScore }) {
    const [friends, setFriends] = React.useState([]);
    const [friendImages, setFriendImages] = React.useState([]);

    React.useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await fetch('/api/friends/list', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userName }),
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const friendUsernames = await response.json();
                if (!friendUsernames || !Array.isArray(friendUsernames)) {
                    throw new Error('Invalid friends list data');
                }
    
                // Fetch detailed friend data in bulk
                const friendsDetails = await fetchFriendsData(friendUsernames);
                setFriends(friendsDetails);
                console.log(friendsDetails);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };
    
        fetchFriends();
    }, [userName]);
    

    // Fetch profile images for the friends whenever friends list changes
    React.useEffect(() => {
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

        if (friends.length > 0) {
            fetchImages();
        }
    }, [friends]);

    const handleIncreaseScore = async (friend, index) => {
        console.log("Button Pressed");
        try {
          // Make API call to update the score in the database
          const response = await fetch('/api/friends/increaseScore', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: friend.email }), // Assuming `friend.name` is the username
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          // Update the local state to reflect the new score
          const updatedFriends = friends.map((f, i) =>
            i === index ? { ...f, score: f.score + 1 } : f
          );
          setFriends(updatedFriends);
        } catch (error) {
          console.error('Error increasing score:', error);
        }

        
      };

    return (
        <main className="container-fluid bg-secondary text-center">
            <h1 className="banner">Welcome, {userName}</h1>
            <h3>Your Friends</h3>
            <div className="image-grid">
                {friends.length > 0 ? (
                    friends.map((friend, index) => (
                        <div key={index} className="grid-item">
                            <h5 className="name">{friend.email}</h5>
                            <img
                                alt={`Profile of ${friend.email}`}
                                src={friendImages[index] || 'https://via.placeholder.com/200'}
                            />
                            <div className="content">Tag Score: {friend.score}</div>
                            <div className="content">Tag Status: {StatusMessage(friend)}</div>
                            <button
                            onClick={() => handleIncreaseScore(friend, index)}
                            type="button"
                            className="tagbutton"
                            disabled={!friend.tagState}
                            >
                            {Message(friend)}
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
