import React, { useState, useEffect } from 'react';
import '../Styles/Products.css';
import team2 from '../Images/bob.png';

function Mocktails() {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(3);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth <= 1068) {
      setVisibleProducts(3);
    } else if (windowWidth <= 1920) {
      setVisibleProducts(3);
    } else if (windowWidth <= 480) {
      setVisibleProducts(3);
    } else {
      setVisibleProducts(products.length);
    }
  }, [windowWidth, products.length]);

  const showMoreProducts = () => {
    setVisibleProducts(prev => prev + 3);
  };

  useEffect(() => {
    fetch('http://localhost:4000/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Filter and map the products
        const baseURL = 'http://localhost:4000/uploads/';
        const productsArray = data
          .filter(product => product.category === 'Mocktail')
          .map(product => ({
            ...product,
            image: baseURL + product.image
          }));
        setProducts(productsArray);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch products. Please try again later.');
      });
  }, []);

  return (
    <div>
      <div className="product-main">
        <div className="homepage" id='mocktail'>
          <div className="content">
            <h1 className="title">Discover <br/>Our Unique <br/>Mocktail Products.</h1>
            <p className="description">
              Lorem ipsum dolor sit amet, consectetur <br />adipiscing elit, sed do eiusmod tempor incididunt<br /> 
              ut labore et dolore magna aliqua. <br />Ut enim ad minim veniam.
            </p>
            <button id='cta-button' className="cta-button"><a href="./booking">Get Some</a></button>
          </div>
        </div>

        <div className="product-head">
          <h1>Mocktail For You</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </div>
        <div className="product-grid">
          {error && <p className="error">{error}</p>}
          {products.slice(0, visibleProducts).map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => { e.target.src = '/path/to/default-image.jpg'; }} // Replace with actual default image path
                />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>{product.category}</p>
              </div>
            </div>
          ))}
        </div>
        {visibleProducts < products.length && (
          <button className="show-more-button" onClick={showMoreProducts}>
            View More
          </button>
        )}
      </div>
      <div className='reviews-container'>
        <h2 className='review-h2'>What Our Customers Say</h2>
        <div className='main-review-section'>
          <div className='main-review-sub'>
            <div className='review-content'>
              <div className='review1'>
                <img src={team2} alt="Drinks" className='review-image'/>
                <h3>Mark Doe</h3>
                <p>CEO, Happy Co</p>
              </div>
              <div className='review2'>
                <p className='stars'>⭐⭐⭐⭐⭐</p>
                <p className='review-text'>“The mocktails at Tipsy Alley are simply phenomenal! Each sip is a unique experience that leaves you craving for more.”</p>
              </div>
            </div>
          </div>
          <div className='main-review-sub'>
            <div className='review-content'>
              <div className='review1'>
                <img src={team2} alt="Drinks" className='review-image'/>
                <h3>Sam John</h3>
                <p>Top, Ben Co</p>
              </div>
              <div className='review2'>
                <p className='stars'>⭐⭐⭐⭐⭐</p>
                <p className='review-text'>“The mocktails at Tipsy Alley are simply phenomenal! Each sip is a unique experience that leaves you craving for more.”</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mocktails;
