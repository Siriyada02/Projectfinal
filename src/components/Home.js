import React from 'react';
import SearchBar from './SearchBar';

const Home = () => {
  return (
    <div className="container">
      <h1>ค้นหาและเปรียบเทียบราคา ราคาเมล็ดพันธุ์</h1>
      <SearchBar />
      <div className="categories">
        <h2>หมวดหมู่</h2>
        <div className="category-list">
          <div className="category-item">
            <img src="path/to/icon1.png" alt="แบรนด์" />
            <h3>แบรนด์</h3>
            <p>CHIATAI, ศรแดง, มังกรเมล็ดพันธุ์</p>
          </div>
          <div className="category-item">
            <img src="path/to/icon2.png" alt="ประเภทเมล็ดพันธุ์" />
            <h3>ประเภทเมล็ดพันธุ์</h3>
            <p>เมล็ดพันธุ์ F1, เมล็ดพันธุ์ OP</p>
          </div>
          <div className="category-item">
            <img src="path/to/icon3.png" alt="สินค้าตามแพ็คเกจ" />
            <h3>สินค้าตามแพ็คเกจ</h3>
            <p>เมล็ดพันธุ์รุ่นบรรจุของ, เมล็ดพันธุ์ในแคปซูล</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
