import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Lấy tham số categoryId từ URL và useNavigate để điều hướng
import CardComponent from '../../components/CardComponent/CardComponent'; // CardComponent để hiển thị sản phẩm
import { WrapperProducts, Sidebar, MainContent } from './style'; // Đảm bảo bạn có style tương ứng

const ProductsPage = () => {
  const { categoryId } = useParams();  // Lấy categoryId từ URL
  const [categories, setCategories] = useState([]); // Lưu trữ tất cả các danh mục
  const [category, setCategory] = useState(null); // Lưu trữ thông tin danh mục hiện tại
  const [products, setProducts] = useState([]);  // Lưu trữ sản phẩm
  const [loading, setLoading] = useState(true);  // Trạng thái loading
  const BASE_URL = "http://localhost:8000/";  // Địa chỉ API
  const navigate = useNavigate(); // Hook để điều hướng đến trang chi tiết sản phẩm

  // Fetch danh mục từ API
  useEffect(() => {
    fetch(`${BASE_URL}api/categories`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);  // Lưu danh mục vào state
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);  // Chỉ gọi API danh mục một lần khi component được mount

  // Fetch danh mục hiện tại và sản phẩm theo categoryId
  useEffect(() => {
    // Lấy thông tin danh mục
    fetch(`${BASE_URL}api/categories/${categoryId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((categoryData) => {
        setCategory(categoryData);  // Lưu danh mục vào state
      })
      .catch((error) => {
        console.error('Error fetching category:', error);
      });

    // Fetch sản phẩm theo categoryId
    fetch(`${BASE_URL}api/categories/${categoryId}/products`) // Chỉnh lại URL API ở đây
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
  }, [categoryId]); // Khi categoryId thay đổi, fetch lại danh mục và sản phẩm

  // Điều hướng đến trang chi tiết sản phẩm
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`); // Điều hướng đến trang chi tiết sản phẩm
  };

  return (
    <div style={{ display: 'flex', width: '100%', margin: '0 auto' }}>
      {/* Sidebar (Danh mục) */}
      <Sidebar style={{ width: '250px', padding: '20px' }}>
        <h3>Danh Mục</h3>
        {/* Hiển thị tất cả các danh mục */}
        {categories.map((categoryItem) => (
          <div
            key={categoryItem.id}
            onClick={() => navigate(`/products/category/${categoryItem.id}`)} // Điều hướng đến danh mục khi click
            style={{ cursor: 'pointer', margin: '10px 0', fontSize: '18px', color: '#000' }}
          >
            {categoryItem.name}
          </div>
        ))}
      </Sidebar>

      {/* Main Content (Hiển thị sản phẩm) */}
      <MainContent style={{ flex: 1, padding: '20px' }}>
        {/* Hiển thị thông tin danh mục */}
        {category && (
          <div style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
            <h1>{category.name}</h1>
            <p>{category.description}</p>
          </div>
        )}

        {/* Hiển thị sản phẩm */}
        <WrapperProducts>
          {loading ? (
            <p style={{ textAlign: 'center', fontSize: '16px', color: '#666' }}>
              Loading products...
            </p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <CardComponent
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product.id)} // Sự kiện click để xem chi tiết sản phẩm
              />
            ))
          ) : (
            <p style={{ textAlign: 'center', fontSize: '16px', color: '#666' }}>
              No products available in this category.
            </p>
          )}
        </WrapperProducts>
      </MainContent>
    </div>
  );
};

export default ProductsPage;
