import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './tagster.css';

export default function App() {
  return (
    <div className='body bg-dark text-light'>
        <nav className="navbar">
            <div className="navbar-container">
                <ul className="navbar-menu">
                    <li>
                        <a href='index.html' className="navbar-item">Home</a>
                    </li>
                <li>
                        <a href='friends.html' className="navbar-item">Friends</a>
                </li>
                    <li>
                        <a href='about.html' className="navbar-item">About</a>
                    </li>
                </ul>
            </div>
        </nav>

        <main>Main content goes here</main>

        <footer>
            <div>Author: Owen Keeler</div>
            <a href="https://github.com/owenck/startup" className="githublink">My GitHub Repository</a>
        </footer>
    </div>
  );
}