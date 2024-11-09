import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';

export function Add({ addFriend }) {
    const [friendName, setFriendName] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAddFriend = () => {
        if (friendName) {
            addFriend(friendName);
            setFriendName('');
            setShowSuccess(true);

            setTimeout(() => setShowSuccess(false), 2000);
        }
    };

  return (
    <main className='container-fluid bg-secondary text-center'>
        <div>
            <h3>Add a Friend</h3>
                <input 
                    type="text" 
                    value={friendName} 
                    onChange={(e) => setFriendName(e.target.value)} 
                    placeholder="Friend's Username" 
                />
                <button onClick={handleAddFriend}>Add Friend</button>

                {showSuccess && (
                    <div className="success-popup">
                        Friend added successfully!
                    </div>
                )}
            </div>
    </main>
  );
}