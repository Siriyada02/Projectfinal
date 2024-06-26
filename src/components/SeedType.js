import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SeedType.css';

const SeedType = () => {
    const { type } = useParams();
    const [seeds, setSeeds] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/seedType/${type}`)
            .then(response => response.json())
            .then(data => setSeeds(data))
            .catch(error => console.error('Error fetching seed data:', error));
    }, [type]);

    const validateUrl = (url) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return `http://${url}`;
        }
        return url;
    };

    return (
        <div className="seed-container">
            {seeds.map((seed, index) => (
                <div key={index} className="seed-card">
                    <img src={seed.image} alt={seed.name} />
                    <h2>{seed.name}</h2>
                    <p>Type: {seed.type}</p>
                    <p>Price: <span className="original-price">฿{seed.originalPrice}</span> ฿{seed.price}</p>
                    <div className="store-prices">
                        <Link to={`/productDetail/${type}`}>
                            <span>ราคาจาก {seed.stores.length} ร้าน</span>
                        </Link>
                        {seed.stores.map((store, idx) => (
                            <div key={idx} className="store-price">
                                <a href={validateUrl(store.url)} target="_blank" rel="noopener noreferrer">
                                    {/* <img src={`/${store.name.toLowerCase()}.png`} alt={store.name} /> */}
                                </a>
                                <span>฿{store.price}</span>
                                <a href={validateUrl(store.url)} target=" " rel=" ">{store.name}</a>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SeedType;
