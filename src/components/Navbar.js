import React from 'react';
import './Navbar.css';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = ({ openAuthPopup }) => {
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
                            <li><Link to='/brand1'>แบรนด์ 1</Link></li>
                            <li><Link to='/brand2'>แบรนด์ 2</Link></li>
                            <li><Link to='/brand3'>แบรนด์ 3</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="dropdown">
                    <Link to='/ประเภทเมล็ดพันธุ์'>ประเภทเมล็ดพันธุ์</Link>
                    <div className="dropdown-content">
                        <ul>
                            <li><Link to='/seedType1'>ประเภท 1</Link></li>
                            <li><Link to='/seedType2'>ประเภท 2</Link></li>
                            <li><Link to='/seedType3'>ประเภท 3</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="dropdown">
                    <Link to='/สินค้าตามแพ็กเกจ'>สินค้าตามแพ็กเกจ</Link>
                    <div className="dropdown-content">
                        <ul>
                            <li><Link to='/packageProducts1'>แพ็กเกจ 1</Link></li>
                            <li><Link to='/packageProducts2'>แพ็กเกจ 2</Link></li>
                            <li><Link to='/packageProducts3'>แพ็กเกจ 3</Link></li>
                        </ul>
                    </div>
                </li>
            </ul>
            <div className="auth-links">
                <button onClick={openAuthPopup} className="auth-link">
                    <i className='fas fa-user'></i><span>Login/Sign Up</span>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
