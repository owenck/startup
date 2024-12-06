import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    try {
      // If the endpoint indicates a user creation scenario, assign a profile picture
      let profilePictureUrl = null;
      if (endpoint.includes('create')) {
        // Use the Picsum API to get a random profile picture
        profilePictureUrl = 'https://picsum.photos/200'; // Random 200x200 image
      }
  
      // Construct the request body including the profile picture if it exists
      const requestBody = {
        email: userName,
        password: password,
      };
  
      // Include profilePictureUrl if it's a user creation endpoint
      if (profilePictureUrl) {
        requestBody.profilePicture = profilePictureUrl;
      }
      console.log(requestBody);
      // Make the API call
      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
  
      // Handle response
      if (response?.status === 200) {
        // Successfully logged in or created user
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
      } else {
        // Handle errors
        const body = await response.json();
        setDisplayError(`⚠ Error: ${body.msg}`);
      }
    } catch (error) {
      // Catch any unexpected errors
      console.error('Error during login or create:', error);
      setDisplayError(`⚠ Error: Unable to process request. Please try again later.`);
    }
  }

  return (
    <>
      <div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>@</span>
          <input className='input' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='your@email.com' />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>🔒</span>
          <input className='input' type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        </div>
        <Button className='loginbutton' onClick={() => loginUser()} disabled={!userName || !password}>
          Login
        </Button>
        <Button className='logoutbutton' onClick={() => createUser()} disabled={!userName || !password}>
          Create
        </Button>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
