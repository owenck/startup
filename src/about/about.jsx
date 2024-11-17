import React from 'react';

export function About() {
  const [imageUrl, setImageUrl] = React.useState('');

  React.useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then((response) => response.json())
        .then((data) => {
          const apiUrl = `${data.message}`;
          setImageUrl(apiUrl);
        })
        .catch((error) => console.error('Error fetching dog image:', error));
}, []);


  return (
    <main className='container-fluid bg-secondary text-center'>
        <div>
           <h1 className="banner">About</h1>
           <h3 className="Login">Play online tag with your friends in Tagster! Tagster is a fun way to stay connected with you friends throughout the day. Jump into tagster and tag your friends to make them it! The longer that you're not it the more points you get. First one to reach the point limit wins bragging rights and becomes the ultimate tagster!</h3>
           <h1 className="banner"> Random Dog Picture </h1>
           <div>
            <img src={imageUrl} alt='picture not found' />
           </div>
        </div>
    </main>
  );
}