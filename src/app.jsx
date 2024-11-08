import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './tagster.css';
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { Login } from './login/login';
import { Add } from './add/add';
import { Friends } from './friends/friends';
import { About } from './about/about';
import { AuthState } from './login/authState';

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
        <div className='body bg-dark text-light'>
            <nav className="navbar">
                <div className="navbar-container">
                    <ul className="navbar-menu">
                        <li>
                            <NavLink className="navbar-item" to=''>Login</NavLink>
                        </li>
                        {authState === AuthState.Authenticated && (
                            <li>
                            <NavLink className="navbar-item" to='friends'>Friends</NavLink>
                            </li>
                        )}
                        <li>
                            <NavLink className="navbar-item" to='about'>About</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <AddButton />
            <Routes>
            <Route
            path='/'
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
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

function AddButton() {
    const location = useLocation();

    if (location.pathname === '/friends') {
        return (
            <div>
                <NavLink className="addbutton" to='add'>+</NavLink>
            </div>
        );
    }

    return null;
}
