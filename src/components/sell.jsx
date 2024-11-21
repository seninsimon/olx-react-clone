


import React, { useRef, useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import './sell.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Sell = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Use navigate hook
  const navigate = useNavigate();

  // Cloudinary Upload Function
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'olx-react'); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dzlubdbjc/image/upload`,
        formData
      );
      return response.data.url; // Return the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const trimcheck = useRef()

  // Handle form submission
  const handleSubmit = async (e) => {
    if(trimcheck.current.value.trim() === "")
    {
        e.preventDefault();
       return alert("add productname")
      
    }
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = '';

      // Upload image to Cloudinary if selected
      if (image) {
        imageUrl = await uploadImageToCloudinary(image);
      }

      // Add data to Firestore
      await addDoc(collection(db, 'products'), {
        productName,
        price,
        location,
        image: imageUrl,
      });

      alert('Product uploaded successfully!');

      // Redirect to home page
      navigate('/');

      // Reset form fields
      setProductName('');
      setPrice('');
      setLocation('');
      setImage(null);
    } catch (error) {
      console.error('Error adding document:', error);
      alert('Failed to upload product');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='sell-body'>
      <div className="sell-page">
        <h1>Sell Your Product</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex'>
            <label>Product Name*</label>
            <input ref={trimcheck} className='input-class'
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className='flex'>
            <label>Price *</label>
            <input className='input-class'
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className='flex'>
            <label>Location *</label>
            <input className='input-class'
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className='flex'>
            <label>Upload Image *</label>
            <div className="file-input-container">
              <input    
                className="custom-file-input"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
          </div>
          <button className='upload-class' type="submit" disabled={uploading}>
            {uploading ? 'Posting...' : 'Post now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sell;
