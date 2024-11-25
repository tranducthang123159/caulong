import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to handle navigation
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperButtonMore, WrapperProducts, WrapperStyleProduct } from './style';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slider1 from '../../assets/images/slider1.webp';
import slider2 from '../../assets/images/slider2.webp';
import slider3 from '../../assets/images/slider3.webp';
import slider4 from '../../assets/images/slider4.webp';
import slider5 from '../../assets/images/slider5.webp';
import CardComponent from '../../components/CardComponent/CardComponent';

const HomePage = () => {
  const [products, setProducts] = useState([]); // Products state
  const [categories, setCategories] = useState([]); // Categories state
  const [loading, setLoading] = useState(true); // Loading state
  const [showMore, setShowMore] = useState(false); // State to handle "show more"
  const BASE_URL = "http://localhost:8000/"; // API base URL
  const navigate = useNavigate(); // Initialize navigate

  // Fetch products from API
  useEffect(() => {
    fetch(`${BASE_URL}api/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const updatedProducts = data.map((product) => ({
          ...product,
          image_url: `${BASE_URL}storage/${product.image_url.replace(/^storage\//, '')}`,
        }));
        setProducts(updatedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Fetch categories from API
  useEffect(() => {
    fetch(`${BASE_URL}api/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  // Handle category click to navigate to the category page
  const handleCategoryClick = (categoryId) => {
    navigate(`/products/category/${categoryId}`);
  };

  // Handle "show more" button click
  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <>
      <div style={{ width: '1270px', margin: '0 auto' }}>
        <WrapperStyleProduct>
          {/* Render categories with a click event */}
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}  // Navigate to category page
              style={{
                cursor: 'pointer',
                margin: '10px 0',
                fontSize: '18px',
                color: '#000', // Change text color to black
                textDecoration: 'none', // Remove underline
              }}
            >
              {category.name} {/* Category name */}
            </div>
          ))}
        </WrapperStyleProduct>
      </div>

      <div style={{ width: '1270px', margin: '0 auto' }}>
        <div className="body" style={{ width: '100%', backgroundColor: '#efefef' }}>
          <div id="container" style={{ minHeight: '1000px', width: '1270px', margin: '0 auto' }}>
            {/* Slider component */}
            <SliderComponent arrImages={[slider1, slider2, slider3, slider4, slider5]} />

            {/* Products */}
            <WrapperProducts>
              {loading ? (
                <p style={{ textAlign: 'center', fontSize: '16px', color: '#666' }}>
                  Loading products...
                </p>
              ) : products.length > 0 ? (
                products.slice(0, showMore ? products.length : 8).map((product) => (  // Show more products if "show more" is clicked
                  <CardComponent key={product.id} product={product} />
                ))
              ) : (
                <p style={{ textAlign: 'center', fontSize: '16px', color: '#666' }}>
                  No products available.
                </p>
              )}
            </WrapperProducts>

            {/* Show more button */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              {!showMore && (
                <WrapperButtonMore
                  textButton="Xem thêm"
                  type="outline"
                  onClick={handleShowMore}
                  styleButton={{
                    border: '1px solid rgb(11,116,229)',
                    color: 'rgb(11,116,229)',
                    width: '240px',
                    height: '38px',
                    borderRadius: '4px',
                  }}
                  styleTextButton={{ fontWeight: 500 }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
