



import React, { useEffect, useState } from 'react';
import './cards.css';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import product1 from '../assets/product1.png';

const Cards = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch data from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productList = [];
        querySnapshot.forEach((doc) => {
          productList.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            className="card-container"
            onClick={() => handleCardClick(product.id)}
          >
            <div className="card">
              <div className="image-container">
                {product.image ? (
                  <img src={product.image} alt={product.productName} className="product-image" />
                ) : (
                  <img src={product1} alt="Default" className="product-image" />
                )}
              </div>
              <div className="info">
                <div className="price">$ {product.price}</div>
                <div className="information">{product.productName}</div>
                <div className="product-location">{product.location}</div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Cards;
