import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/user/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setUserData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setError(error);
                setLoading(false);
            });
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!userData) {
        return <div>No user data found</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <i className="fas fa-user avatar"></i>
                <h1>{userData.username}</h1>
                <p>{userData.email}</p>
            </div>
            <div className="profile-content">
                <h2>ประวัติการดูสินค้า</h2>
                <div className="product-history">
                    {userData.productHistory && userData.productHistory.length > 0 ? (
                        userData.productHistory.map((product, index) => (
                            <div key={index} className="product-item">
                                <img src={product.imageUrl} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{product.price} บาท</p>
                            </div>
                        ))
                    ) : (
                        <p>ไม่มีประวัติการดูสินค้า</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
