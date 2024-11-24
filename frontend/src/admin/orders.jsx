import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          throw new Error('Failed to fetch orders');
        }
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customer.name',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
    },
    {
      title: 'Tổng giá',
      render: (text, record) => `${record.total_price}đ`,
    },
    {
        title: 'Chi tiết',
        render: (text, record) => (
          <Link to={`${record.id}`}>
            <Button type="primary">Xem chi tiết</Button>
          </Link>
        ),
      }
  ];

  return (
    <div>
      <h2>Danh sách đơn hàng</h2>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default OrdersPage;
