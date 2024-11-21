import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import Categories from './Categories';
import Ad from './Ad';
import gps from '../assets/gps.png'
import './product.css'

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.error('No such product!');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <>
            <Categories />
            <Ad />

            <div className="main-container">



                <div className="left-div">

                    <div className="image-div">

                        {product.image && <img src={product.image} alt={product.productName} />}

                    </div>

                    <div className="description">
                          <h3>Description</h3>
                        <p>{product.productName}</p>
                        <p>Price: ${product.price}</p>
                        <p>Location: {product.location}</p>

                    </div>

                </div>

                <div className="right-div">

                    <div className="informations">


                        <h1  className='info-product-price' >${product.price}</h1>
                        
                        <h1 className='info-product-name' >{product.productName}</h1>
                        
                        <p className='info-product-location' >Location: {product.location}</p>

                        <p className='today' >today</p>

                    </div>

                    <div className="chatseller">

                        <button>Chat with seller</button>

                    </div>

                    <div className="postedin">
                        <h3>Posted in</h3>
                        <h2>{product.location}</h2>
                    </div>

                    <div className="gps">

                        <img src={gps} alt="" />

                    </div>

                </div>





            </div>


        </>
    );
};

export default ProductDetails;

//    {/* <div className="product-details">
//       <h1>{product.productName}</h1>
//       <p>Price: ${product.price}</p>
//       <p>Location: {product.location}</p>
//       {product.image && <img src={product.image} alt={product.productName} />}
//     </div> */}
