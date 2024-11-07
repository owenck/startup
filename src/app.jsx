import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './tagster.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Add } from './add/add';
import { Friends } from './friends/friends';
import { About } from './about/about';

export default function App() {
  return (
    <BrowserRouter>
        <div className='body bg-dark text-light'>
            <nav className="navbar">
                <div className="navbar-container">
                    <ul className="navbar-menu">
                        <li>
                            <NavLink className="navbar-item" to=''>Login</NavLink>
                        </li>
                        <li>
                            <NavLink className="navbar-item" to='friends'>Friends</NavLink>
                        </li>
                        <li>
                            <NavLink className="navbar-item" to='about'>About</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/friends' element={<Friends />} />
            <Route path='/add' element={<Add />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
            </Routes>

            <footer>
                <div>Author: Owen Keeler</div>
                <a href="https://github.com/owenck/startup" className="githublink">My GitHub Repository</a>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }