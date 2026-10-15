import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const ProductEdit = () => {
  const { id } = useParams(); // If id exists, it means it's editing
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load categories list for select dropdown
    api.get('categories/')
      .then(res => setCategories(res.data.results || res.data))
      .catch(err => console.error('Error loading categories', err));

    // If id is provided, we are editing — fetch product data
    if (id) {
      setLoading(true);
      api.get(`products/${id}/`)
        .then(res => {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setPrice(res.data.price);
          setCategory(res.data.category);
        })
        .catch(err => console.error('Error loading product', err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { title, description, price, category };

    try {
      if (id) {
        // Editing
        await api.put(`products/${id}/`, productData);
      } else {
        // Creation
        await api.post('products/', productData);
      }
      navigate('/catalog');
    } catch (err) {
      console.error('Error saving product', err);
      alert('Failed to save the product. Please check your data.');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '80px' }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '40px', background: '#fff', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', border: '1px solid #eaeaea' }}>
      <h2 style={{ marginBottom: '25px', color: '#1a1a1a' }}>
        {id ? 'Edit Product' : 'Create Product'}
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ced4da', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ced4da', boxSizing: 'border-box', background: '#fff' }}
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Price (₾)</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ced4da', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            rows="5"
            required
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ced4da', boxSizing: 'border-box' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ padding: '12px', background: '#F59E0B', color: '#1a1a1a', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
        >
          {id ? 'Save Changes' : 'Publish Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;