import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
// Import the correct path to your authorization context:
import { AuthContext } from '../context/AuthContext'; 

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get current user from context

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`products/${id}/`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error loading product', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Product deletion function
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`products/${id}/`);
        navigate('/catalog');
      } catch (err) {
        console.error('Error deleting product', err);
        alert('Failed to delete the product. You do not have sufficient permissions.');
      }
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '80px', color: '#666', fontSize: '16px' }}>Loading product information...</div>;
  }

  if (error || !product) {
    return (
      <div style={{ textAlign: 'center', padding: '80px' }}>
        <h3 style={{ fontSize: '22px', color: '#1a1a1a' }}>Product not found</h3>
        <button 
          onClick={() => navigate('/catalog')} 
          style={{ marginTop: '20px', padding: '10px 20px', background: '#F59E0B', color: '#1a1a1a', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Back to Catalog
        </button>
      </div>
    );
  }

  // Check: whether the user is an admin or the product owner
  const isOwnerOrAdmin = user && (user.role === 'admin' || user.username === product.owner?.username);

  return (
    <div style={{ maxWidth: '800px', margin: '60px auto', padding: '40px', background: '#fff', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', border: '1px solid #eaeaea' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ background: 'none', border: 'none', color: '#D97706', cursor: 'pointer', padding: 0, fontSize: '15px', fontWeight: '600' }}
        >
          ← Back to list
        </button>

        {/* Control buttons for admin or owner */}
        {isOwnerOrAdmin && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => navigate(`/products/${id}/edit`)} // Specify your edit path if available
              style={{ padding: '6px 14px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
            >
              Edit
            </button>
            <button 
              onClick={handleDelete}
              style={{ padding: '6px 14px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <h1 style={{ margin: 0, fontSize: '32px', color: '#1a1a1a' }}>{product.title}</h1>
        <span style={{ fontSize: '26px', fontWeight: 'bold', color: '#16a34a' }}>{product.price} ₾</span>
      </div>

      <div style={{ marginBottom: '25px' }}>
        <span style={{ background: '#fdfbf7', color: '#D97706', border: '1px solid #faedcd', padding: '6px 14px', borderRadius: '20px', fontSize: '14px', fontWeight: '600' }}>
          Category: {product.category_name || 'Uncategorized'}
        </span>
      </div>

      <div style={{ marginBottom: '35px', borderTop: '1px solid #f8f9fa', borderBottom: '1px solid #f8f9fa', padding: '25px 0' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#444' }}>Product Description</h3>
        <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#6c757d', whiteSpace: 'pre-line', margin: 0 }}>
          {product.description}
        </p>
      </div>

      {/* Seller and Contacts Block */}
      <div style={{ background: '#fdfbf7', border: '1px solid #faedcd', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#8c7a6b', fontWeight: '600' }}>SELLER</p>
          <p style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold', color: '#1a1a1a' }}>
            👤 {product.owner?.username || 'Not specified'}
          </p>
          <p style={{ margin: 0, fontSize: '14px', color: '#D97706', fontWeight: '500' }}>
            ✉️ {product.owner?.email || 'Email not specified'}
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#8c7a6b', fontWeight: '600' }}>PUBLISHED DATE</p>
          <p style={{ margin: 0, fontSize: '14px', color: '#555', fontWeight: '500' }}>
            📅 {new Date(product.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;