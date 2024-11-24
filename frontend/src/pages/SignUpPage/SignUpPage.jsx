import React, { useState } from 'react';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Image } from 'antd';
import imageLogo from '../../assets/images/logo-login.png';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Sử dụng hook mutation để gửi yêu cầu đăng ký
  const mutation = useMutationHooks((data) => UserService.signupUser(data));
  const { isPending, isError, error } = mutation;

  // Điều hướng người dùng sang trang đăng nhập nếu đã có tài khoản
  const handleNavigateSignIn = () => {
    navigate('/sign-in');
  };

  const handleSignUp = async () => {
    // Kiểm tra mật khẩu có khớp không
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }

    // Kiểm tra các trường bắt buộc có được điền đầy đủ không
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    try {
      // Gửi yêu cầu đăng ký tới backend
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData), // Gửi dữ liệu form dưới dạng JSON
      });

      const data = await response.json(); // Parse dữ liệu phản hồi từ backend

      if (response.ok) {
        // Nếu đăng ký thành công
        alert('Đăng ký thành công!');
        navigate('/sign-in'); // Chuyển hướng đến trang đăng nhập
      } else {
        // Nếu đăng ký thất bại, hiển thị thông báo lỗi
        alert('Đăng ký thất bại: ' + (data.message || 'Lỗi không xác định'));
      }
    } catch (error) {
      // Bắt lỗi nếu có và hiển thị thông báo lỗi
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập hoặc Tạo tài khoản</p>

          {/* Form điền thông tin đăng ký */}
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
          />

          <Loading isPending={isPending}>
            <ButtonComponent
              disabled={isPending || !formData.name || !formData.email || !formData.password || !formData.confirmPassword}
              onClick={handleSignUp}
              size={40}
              styleButton={{
                background: 'rgb(255,57,69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px',
              }}
              textButton="Đăng kí"
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            />
          </Loading>

          <p>
            Bạn đã có tài khoản?{' '}
            <WrapperTextLight onClick={handleNavigateSignIn}>Đăng nhập</WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="image-logo" height="300px" width="300px" />
          <h4>Mua sắm tại BeeBadminton</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;
