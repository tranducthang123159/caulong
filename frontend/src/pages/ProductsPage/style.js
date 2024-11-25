import styled from 'styled-components';

// Định nghĩa style cho Sidebar
export const Sidebar = styled.div`
  width: 250px;
  padding: 20px;
  background-color: #f4f4f4;
  border-right: 1px solid #ccc;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

// Định nghĩa style cho Main Content
export const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #efefef;
`;

// Định nghĩa style cho WrapperProducts (Hiển thị sản phẩm)
export const WrapperProducts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

// Các style khác có thể đã được định nghĩa từ trước
export const WrapperButtonMore = styled.button`
  // Add your button styles here
`;

export const WrapperStyleProduct = styled.div`
  // Add your wrapper styles here
`;
