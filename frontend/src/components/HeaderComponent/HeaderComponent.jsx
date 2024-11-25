import React, { useState, useEffect } from 'react';
import { Badge, Col } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccout, WrapperTextHeaderSmall } from './style';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
  const [email, setEmail] = useState(null); // State lưu thông tin email người dùng
  const [cartCount, setCartCount] = useState(0); // State to store cart count
  const [searchQuery, setSearchQuery] = useState(""); // State cho input tìm kiếm
  const [products, setProducts] = useState([]); // Lưu danh sách sản phẩm
  const [searchResults, setSearchResults] = useState([]); // Lưu kết quả tìm kiếm
  const navigate = useNavigate();

  // Fetch sản phẩm từ API khi load trang
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail); // Cập nhật state email
    }

    // Gửi yêu cầu GET để lấy dữ liệu từ API
    fetch('http://localhost:8000/api/products')
      .then((response) => response.json()) // Chuyển đổi dữ liệu thành JSON
      .then((data) => {
        setProducts(data); // Cập nhật danh sách sản phẩm từ API
      })
      .catch((error) => {
        console.error('Error fetching products:', error); // Xử lý lỗi nếu có
      });
  }, []);

  // Handle tìm kiếm
  const handleSearch = () => {



    console.log('Tìm kiếm đã được gọi!');
    if (searchQuery.trim()) {
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredProducts); // Cập nhật kết quả tìm kiếm
      console.log('Kết quả tìm kiếm:', filteredProducts);
    } else {
      setSearchResults([]); // Nếu không có từ khóa, xóa kết quả tìm kiếm
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userEmail'); // Xóa thông tin email khỏi localStorage
    setEmail(null); // Cập nhật lại trạng thái email
    navigate('/'); // Chuyển hướng về trang chủ
  };

  // Handle navigate to login page
  const handleNavigateLogin = () => {
    navigate('/sign-in'); // Chuyển hướng đến trang đăng nhập
  };

  // Handle navigate to product details page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Chuyển hướng đến trang chi tiết sản phẩm
  };

  return (
    <div style={{ width: '100%', background: 'rgb(26,148,255)', display: 'flex', justifyContent: 'center' }}>
      <WrapperHeader gutter={16}>
        <Col span={5}>
          <WrapperTextHeader>
            BeeBadminton
          </WrapperTextHeader>
        </Col>
        <Col span={13}>
          {/* Form tìm kiếm */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật giá trị khi thay đổi
              placeholder="Tìm sản phẩm"
              style={{
                padding: '8px 16px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                flex: 1, // Đảm bảo ô input chiếm hết không gian còn lại
                marginRight: '10px', // Khoảng cách giữa input và nút
              }}
            />
            <button
              onClick={handleSearch} // Gọi hàm handleSearch khi nhấn nút
              style={{
                padding: '8px 16px',
                backgroundColor: 'rgb(13,92,182)',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Tìm kiếm
            </button>
          </div>

          {/* Kết quả tìm kiếm */}
          {searchResults.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                width: '100%',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderTop: 'none',
                maxHeight: '300px',
                overflowY: 'auto',
                zIndex: '10',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              {searchResults.map((product) => {
                const imageUrl = `http://localhost:8000/storage${product.image_url}`;
                return (
                  <div
                    key={product.id}
                    style={{
                      padding: '10px',
                      borderBottom: '1px solid #ddd',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleProductClick(product.id)}
                  >
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    {/* Hiển thị hình ảnh sản phẩm */}
                    <img
                      src={`http://localhost:8000/storage${product.image_url}`}
                      alt={product.name}
                      style={{
                        width: '300px', // Điều chỉnh kích thước hình ảnh
                        height: '300px',
                        objectFit: 'cover',
                      }}
                    />

                  </div>
                );
              })}
            </div>
          )}
        </Col>

        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
          <WrapperHeaderAccout>
            {email ? (
              <>
                <UserOutlined style={{ fontSize: '30px', color: '#fff' }} />
                <div>
                  <WrapperTextHeaderSmall>{email}</WrapperTextHeaderSmall>
                  <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    <WrapperTextHeaderSmall>Đăng xuất</WrapperTextHeaderSmall>
                    <LogoutOutlined />
                  </div>
                </div>
              </>
            ) : (
              <>
                <UserOutlined style={{ fontSize: '30px', color: '#fff' }} />
                <div>
                  <WrapperTextHeaderSmall>Đăng Nhập/Đăng Kí</WrapperTextHeaderSmall>
                  <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                    <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              </>
            )}
          </WrapperHeaderAccout>

          <div>
            <Badge count={cartCount} size="small">
              <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
