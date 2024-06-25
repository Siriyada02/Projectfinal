import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/product/${productId}`)
            .then(response => {
                console.log('Product data:', response.data);  // Add this line
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
                setLoading(false);
            });
    }, [productId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="product-details-container">
            <nav className="breadcrumb">
                <a href="/">Home</a> / <a href="/brands">แบรนด์</a> / <a href={`/brands/${product.brand}`}>{product.brand}</a> {product.name}
            </nav>
            <div className="product-details-card">
                <img src={product.image} alt={product.name} className="product-details-image" />
                <div className="product-details-info">
                    <h1 className="product-details-title">{product.name}</h1>
                    <p className="product-details-price">฿{product.price}</p>
                    {Array.isArray(product.stores) && product.stores.length > 0 && (
                        <div className="recommended-stores">
                            <h2>ร้านค้าแนะนำ</h2>
                            {product.stores.map((store, index) => (
                                <div key={index} className="store">
                                    <img src={store.logo} alt={store.name} className="store-logo" />
                                    <p className="store-price">฿{store.price}</p>
                                    <a href={store.link} className="store-button" target="_blank" rel="noopener noreferrer">ไปยังร้านค้า</a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;





