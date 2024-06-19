import React from 'react';
import './Navbar.css';
import logo from '../logo.svg'
import { Link } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = ({ toggleForm }) => {
    return (
        <nav className="navbar">
            <div className='logo-container'>
                <Link to='/'>
                    <img src={logo} className='logo' alt='logo' />
                </Link>
            </div>
            <ul className="nav-links">
                <li><Link to='/แบรนด์'>แบรนด์</Link></li>
                <li><Link to='/ประเภทเมล็ดพันธุ์'>ประเภทเมล็ดพันธุ์</Link></li>
                <li><Link to='/สินค้าตามแพ็กเกจ'>สินค้าตามแพ็กเกจ</Link></li>
            </ul>
            <li className="auth-links">
                <Link to="/auth" className="auth-link"><i className='fas fa-user'></i>Login/Sign Up</Link>
            </li>
        </nav>
    );
}

export default Navbar;
