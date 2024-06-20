import React from 'react';
import SearchBar from './SearchBar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWheatAwn, faTree, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    return (
        <div className="container">
            <h1>ค้นหาและเปรียบเทียบราคาเมล็ดพันธุ์</h1>
            <SearchBar />
            <div className="categories">
                <h2>หมวดหมู่</h2>
                <div className="category-list">
                    <div className="category-item">
                        <FontAwesomeIcon icon={faWheatAwn} style={{ fontSize: '35px' }} />
                        <h3>แบรนด์</h3>
                        <p>CHIATAI</p>
                        <p>ศรแดง</p>
                        <p>มังกรเมล็ดพันธุ์</p>
                    </div>
                    <div className="category-item">
                        <FontAwesomeIcon icon={faTree} style={{ fontSize: '35px' }} />
                        <h3>ประเภทเมล็ดพันธุ์</h3>
                        <p>เมล็ดพันธุ์ F1</p>
                        <p>เมล็ดพันธุ์ OP</p>
                    </div>
                    <div className="category-item">
                        <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: '35px' }} />
                        <h3>สินค้าตามแพ็คเกจ</h3>
                        <p>เมล็ดพันธุ์รุ่นบรรจุของ</p>
                        <p>เมล็ดพันธุ์ในห่อ</p>
                        <p>เมล็ดพันธุ์ในลัง</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
