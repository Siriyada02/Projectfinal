import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:5000/search?q=${searchTerm}`);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className="search-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="ค้นหาเมล็ดพันธุ์"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch}>ค้นหา</button>
            </div>
            <div className="search-results">
                {results.length > 0 ? (
                    <div className="product-grid">
                        {results.map((product) => (
                            <div key={product.index} className="product-card" onClick={() => navigate(`/product/${product.index}`)}>
                                <img src={product.image} alt={product.name} className="product-image" />
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <div className="price-container">
                                        <span className="product-price">฿40</span>
                                        <span className="product-price-new">฿{product.price}</span>
                                    </div>
                                    {product.stores && (
                                        <button className="store-price" onClick={() => navigate(`/product/${product.index}`)}>ราคา {product.stores.length} ร้าน </button>
                                    )}
                                    {product.stores && product.stores.map((store, index) => (
                                        <div key={index} className="store-info">
                                            <img src={store.logo} alt={store.name} className="store-logo" />
                                            <span>฿{store.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
};

export default SearchBar;




