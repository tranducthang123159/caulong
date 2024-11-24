import React, { useEffect, useState } from 'react';
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading status
  const arr = ['Lining', 'Yonex', 'Victor', 'Mizuno'];
  const BASE_URL = "http://localhost:8000/"; // API base URL

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
          image_url: `${BASE_URL}storage/${product.image_url.replace(/^storage\//, '')}`, // Ensure correct storage path
        }));
        setProducts(updatedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);
  

  return (
    <>
      <div style={{ width: '1270px', margin: '0 auto' }}>
        <WrapperStyleProduct>
          {arr.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperStyleProduct>
      </div>
      <div className="body" style={{ width: '100%', backgroundColor: '#efefef' }}>
        <div id="container" style={{ minHeight: '1000px', width: '1270px', margin: '0 auto' }}>
          <SliderComponent arrImages={[slider1, slider2, slider3, slider4, slider5]} />
          <WrapperProducts>
            {loading ? (
              <p style={{ textAlign: 'center', fontSize: '16px', color: '#666' }}>
                Loading products...
              </p>
            ) : products.length > 0 ? (
              products.map((product) => (
                <CardComponent key={product.id} product={product} />
              ))
            ) : (
              <p style={{ textAlign: 'center', fontSize: '16px', color: '#666' }}>
                No products available.
              </p>
            )}
          </WrapperProducts>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <WrapperButtonMore
              textButton="xem thêm"
              type="outline"
              styleButton={{
                border: '1px solid rgb(11,116,229)',
                color: 'rgb(11,116,229)',
                width: '240px',
                height: '38px',
                borderRadius: '4px',
              }}
              styleTextButton={{ fontWeight: 500 }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
