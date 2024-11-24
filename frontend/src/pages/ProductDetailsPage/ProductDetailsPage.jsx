import React from 'react';
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent';

const ProductDetailsPage = () => {
  return (
    <div style={{padding:'0 120px', background:'#efefef', minHeight:'100vh'}}>
      <h5>Trang chủ</h5>
      <div>
        <ProductDetailsComponent />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
