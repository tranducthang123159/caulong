import React, { useState, useEffect } from 'react';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import imageLogo from '../../assets/images/logo-login.png';
import { Image } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/LoadingComponent/Loading';

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPending, setIsPending] = useState(false);
  
  const navigate = useNavigate();

  // Khi mutation thành công
  useEffect(() => {
    if (successMessage) {
      // Hiển thị thông báo thành công
      setSuccessMessage('Đăng nhập thành công!');
      // Điều hướng đến trang chủ hoặc trang người dùng sau khi đăng nhập thành công
      navigate('/');
    }
  }, [successMessage, navigate]);

  // Khi mutation thất bại
  useEffect(() => {
    if (errorMessage) {
      // Nếu có lỗi thì hiển thị thông báo lỗi
      setErrorMessage(errorMessage || 'Đăng nhập thất bại, vui lòng thử lại.');
    }
  }, [errorMessage]);

  const handleNavigateSignUp = () => {
    navigate('/sign-up'); // Chuyển hướng đến trang đăng ký
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  
  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = async () => {
    setIsPending(true); // Set loading state khi gửi yêu cầu
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, password }), // Gửi dữ liệu đăng nhập
      });

      const data = await response.json(); // Phân tích phản hồi từ API

      if (response.ok) {
        // Nếu đăng nhập thành công
        setSuccessMessage('Đăng nhập thành công!');
        // Lưu token hoặc thông tin người dùng vào localStorage
        localStorage.setItem('userToken', data.token); // Lưu token cho phiên làm việc
        localStorage.setItem('userEmail', email); // Lưu email của người dùng
        navigate('/'); // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
      } else {
        // Nếu đăng nhập thất bại
        setErrorMessage(data.message || 'Đăng nhập thất bại, vui lòng thử lại.');
      }
    } catch (error) {
      // Xử lý lỗi nếu yêu cầu không thành công
      console.error('Error:', error);
      setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsPending(false); // Dừng trạng thái loading khi đã hoàn thành yêu cầu
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập hoặc Tạo tài khoản</p>
          <InputForm
            style={{ marginBottom: '10px' }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnchangeEmail}
          />
          <div style={{ position: 'relative' }}>
            <span
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px',
                cursor: 'pointer',
              }}
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="Mật khẩu"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>

          {/* Hiển thị thông báo lỗi nếu có */}
          {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}

          {/* Hiển thị thông báo thành công nếu đăng nhập thành công */}
          {successMessage && <span style={{ color: 'green' }}>{successMessage}</span>}

          {/* Loading component cho Button */}
          <Loading isPending={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              size={40}
              styleButton={{
                background: 'rgb(255,57,69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px',
              }}
              textButton={'Đăng nhập'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            />
          </Loading>

          <p><WrapperTextLight>Quên mật khẩu</WrapperTextLight></p>
          <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}> Tạo tài khoản </WrapperTextLight></p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="image-logo" height="300px" width="300px" />
          <h4>Mua sắm tại BeeBadminton</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
