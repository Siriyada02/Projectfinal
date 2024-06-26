import React from 'react';
import './Navbar.css';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = ({ openAuthPopup, isLoggedIn, userId, onLogout }) => {
    return (
        <nav className="navbar">
            <div className='logo-container'>
                <Link to='/'>
                    <img src={logo} className='logo' alt='logo' />
                </Link>
            </div>
            <ul className="nav-links">
                <li className="dropdown">
                    <Link to='/แบรนด์'>แบรนด์</Link>
                    <div className="dropdown-content">
                        <ul>
                            <li><Link to='https://www.chiataigroup.com/'>CHIATAI</Link></li>
                            <li><Link to='https://sorndaengseed.com/'>ศรแดง</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="dropdown">
                    <Link to='/ประเภทเมล็ดพันธุ์'>ประเภทเมล็ดพันธุ์</Link>
                    <div className="dropdown-content">
                        <ul>
                            <li><Link to='/seedType/F1'> F1 </Link></li>
                            <li><Link to='/seedType/OP'>OP</Link></li>
                        </ul>
                    </div>
                </li>
            </ul>
            <div className="auth-links">
                {isLoggedIn ? (
                    <div className="user-dropdown">
                        <i className='fas fa-user'></i>
                        <div className="user-dropdown-content">
                            <Link to={`/User/${userId}`} className="user-profile-link">Profile</Link>
                            <button onClick={onLogout} className="logout-button">Logout</button>
                        </div>
                    </div>
                ) : (
                    <button onClick={openAuthPopup} className="auth-link">
                        <i className='fas fa-user'></i><span>Login/Sign Up</span>
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
