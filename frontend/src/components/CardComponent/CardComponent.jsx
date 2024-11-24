import React from 'react';
import { StyleNameProduct, WrapperReportText, WrapperPriceText, WrapperDiscountText, WrapperCardStyle } from './style';
import { StarFilled } from '@ant-design/icons';

const CardComponent = ({ product }) => {
  const imageUrl = product.image_url || '';  // Use the correct image URL
  const productLink = `/product/${product.id}`;  // Example: Adjust the link according to your routing structure

  return (
    <a href={productLink} style={{ textDecoration: 'none' }}>  {/* Wrap card in a link */}
      <WrapperCardStyle
        hoverable
        style={{ width: 200, borderRadius: '8px', overflow: 'hidden' }}
        bodyStyle={{ padding: '10px' }}
      >
        {/* Product Image */}
        {imageUrl && (
          <img
            alt={product.name}
            src={imageUrl}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',  // Ensures the image covers the area without stretching
              borderRadius: '4px',  // Optional: to give rounded corners to the image
            }}
          />
        )}

        {/* Product Name */}
        <StyleNameProduct style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '16px' }}>
          {product.name}
        </StyleNameProduct>

        {/* Product Category */}
        <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
          <strong></strong> {product.category ? product.category.name : 'N/A'}
        </div>

        {/* Product Rating */}
        <WrapperReportText style={{ marginBottom: '8px' }}>
          <span style={{ marginRight: '4px' }}>
            <span>{product.rating}</span>
            <StarFilled style={{ fontSize: '14px', color: 'yellow' }} />
          </span>
          <span>| Đã bán 122+</span>
        </WrapperReportText>

        {/* Product Price and Discount */}
        <WrapperPriceText style={{ fontSize: '14px', fontWeight: 'bold' }}>
          {product.price}đ
          {product.discount && (
            <WrapperDiscountText style={{ marginLeft: '5px', color: 'red', fontWeight: 'bold' }}>
              -{product.discount}%
            </WrapperDiscountText>
          )}
        </WrapperPriceText>
      </WrapperCardStyle>
    </a>
  );
};

export default CardComponent;
