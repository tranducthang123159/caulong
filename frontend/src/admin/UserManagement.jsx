import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from '../api/axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // For editing user
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [showPasswordList, setShowPasswordList] = useState({}); // State to control password visibility for each user in the list

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
      setSuccessMessage(null); // Reset success message
    } catch (err) {
      setError('Failed to fetch users');
      setSuccessMessage(null);
    }
  };

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.email || !form.password) {
      setError('Email and password are required');
      return;
    }

    try {
      if (isEditing) {
        // Update user
        await axios.put(`/users/${selectedUser.id}`, form);
        setSuccessMessage('User updated successfully!');
      } else {
        // Create new user
        await axios.post('/users', form);
        setSuccessMessage('User added successfully!');
      }

      setShowModal(false);
      setForm({ email: '', password: '' }); // Reset form
      fetchUsers(); // Refresh the user list
      setError(null); // Clear any previous error
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
      setSuccessMessage(null);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setForm({ email: user.email, password: user.password });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/users/${id}`);
        fetchUsers(); // Refresh the user list after deletion
        setSuccessMessage('User deleted successfully!');
        setError(null);
      } catch (err) {
        setError('Failed to delete user');
        setSuccessMessage(null);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  // Toggle password visibility for each user in the list
  const togglePasswordListVisibility = (userId) => {
    setShowPasswordList(prevState => ({
      ...prevState,
      [userId]: !prevState[userId], // Toggle visibility for the clicked user
    }));
  };

  return (
    <div>
      <h2>User Management</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
        Add New User
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>
                {/* Display password and toggle visibility */}
                <div className="d-flex align-items-center">
                  <span>
                    {showPasswordList[user.id] ? user.password : '*****'}
                  </span>
                  <Button
                    variant="outline-secondary"
                    onClick={() => togglePasswordListVisibility(user.id)}
                    className="ms-2"
                  >
                    {showPasswordList[user.id] ? 'Hide' : 'Show'}
                  </Button>
                </div>
              </td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(user)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit User */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit User' : 'Add New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleFormChange}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                  className="ms-2"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditing ? 'Update' : 'Add'} User
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserManagement;
