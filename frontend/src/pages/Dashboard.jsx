import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [myProducts, setMyProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [loadingProduct, setLoadingProduct] = useState(false);

  
  const [editingProduct, setEditingProduct] = useState(null);

  
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loadingCategory, setLoadingCategory] = useState(false);

  
  const fetchData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        api.get('categories/'),
        api.get('products/')
      ]);

      setCategories(catRes.data.results || catRes.data);

      const allProducts = prodRes.data.results || prodRes.data;
      const filtered = allProducts.filter(
        (p) => p.owner?.username === user?.username
      );
      setMyProducts(filtered);
    } catch (err) {
      console.error('Data loading error', err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    setLoadingCategory(true);
    try {
      await api.post('categories/', { name: newCategoryName });
      setNewCategoryName('');
      await fetchData();
      alert('Category successfully added!');
    } catch (err) {
      console.error('Error creating category', err);
      alert('Failed to create the category');
    } finally {
      setLoadingCategory(false);
    }
  };

  
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!category) {
      alert('Please, choose category');
      return;
    }
    setLoadingProduct(true);
    try {
      await api.post('products/', {
        title,
        description,
        price,
        category: Number(category),
      });
      setTitle('');
      setDescription('');
      setPrice('');
      setCategory('');
      fetchData();
      alert('The product has been successfully created!');
    } catch (err) {
      console.error('Error creating product', err);
      alert('Failed to create the product');
    } finally {
      setLoadingProduct(false);
    }
  };

  
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`products/${id}/`);
        fetchData();
      } catch (err) {
        console.error('Error deleting product', err);
        alert('Failed to delete the product');
      }
    }
  };

  
  const handleUpdateProduct = async (id) => {
    try {
      await api.put(`products/${id}/`, {
        title: editingProduct.title,
        description: editingProduct.description,
        price: editingProduct.price,
        category: Number(editingProduct.category),
      });
      setEditingProduct(null);
      fetchData();
      alert('The product has been successfully updated!');
    } catch (err) {
      console.error('Product update error', err);
      alert('Failed to update the product');
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
      <h2 style={{ fontSize: '28px', color: '#1a1a1a', marginBottom: '20px' }}>Seller's Dashboard</h2>

      
      <div style={{ background: '#fdfbf7', padding: '20px', borderRadius: '14px', marginBottom: '30px', border: '1px solid #faedcd' }}>
        <p style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#444' }}>
          Welcome, <strong style={{ color: '#1a1a1a' }}>{user?.username}</strong>!
        </p>
        <p style={{ margin: 0, color: '#8c7a6b', fontSize: '14px' }}>
          Role in the system: <em style={{ color: '#D97706', fontWeight: 'bold' }}>{user?.role || 'user'}</em>
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
        
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          <div style={{ background: '#fff', padding: '25px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 6px 20px rgba(0,0,0,0.04)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px', color: '#1a1a1a' }}>Add New Category</h3>
            <form onSubmit={handleCreateCategory} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Name of Category"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                required
                style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid #ced4da', outline: 'none' }}
              />
              <button
                type="submit"
                disabled={loadingCategory}
                style={{ background: '#1a1a1a', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Add
              </button>
            </form>
          </div>

          <div style={{ background: '#fff', padding: '25px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 6px 20px rgba(0,0,0,0.04)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px', color: '#1a1a1a' }}>Post Product</h3>
            <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: '#444' }}>Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ced4da', background: '#fff', outline: 'none' }}
                >
                  <option value="">-- Choose Category --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: '#444' }}>Product Name:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ced4da', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: '#444' }}>Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ced4da', boxSizing: 'border-box', minHeight: '80px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: '#444' }}>Price (₾):</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ced4da', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={loadingProduct}
                style={{ background: '#F59E0B', color: '#1a1a1a', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '10px' }}
              >
                {loadingProduct ? 'creating...' : 'Post Product'}
              </button>
            </form>
          </div>
        </div>

        
        <div>
          <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px', color: '#1a1a1a' }}>My Posted Products</h3>
          {myProducts.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {myProducts.map((prod) => {
                const isEditing = editingProduct && editingProduct.id === prod.id;

                return (
                  <div
                    key={prod.id}
                    style={{
                      background: '#fff',
                      padding: '20px',
                      borderRadius: '14px',
                      border: isEditing ? '2px solid #F59E0B' : '1px solid #eaeaea',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                    }}
                  >
                    {isEditing ? (
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input
                          type="text"
                          value={editingProduct.title}
                          onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ced4da' }}
                        />
                        <textarea
                          value={editingProduct.description}
                          onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ced4da', minHeight: '60px' }}
                        />
                        <input
                          type="number"
                          step="0.01"
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ced4da' }}
                        />
                        <select
                          value={editingProduct.category}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ced4da', background: '#fff' }}
                        >
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                          <button
                            onClick={() => handleUpdateProduct(prod.id)}
                            style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingProduct(null)}
                            style={{ background: '#e5e7eb', color: '#374151', border: 'none', padding: '6px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#1a1a1a' }}>{prod.title}</h4>
                          <p style={{ margin: '0 0 4px 0', color: '#16a34a', fontWeight: 'bold', fontSize: '15px' }}>{prod.price} ₾</p>
                          {prod.category_name && (
                            <span style={{ fontSize: '12px', color: '#D97706', background: '#fdfbf7', padding: '2px 8px', borderRadius: '10px', border: '1px solid #faedcd' }}>
                              {prod.category_name}
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => setEditingProduct({ 
                              id: prod.id, 
                              title: prod.title, 
                              description: prod.description, 
                              price: prod.price, 
                              
                              category: typeof prod.category === 'object' ? prod.category?.id : (prod.category || '')
                            })}
                            style={{ background: '#fef3c7', color: '#b45309', border: 'none', padding: '8px 12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '8px 12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #eaeaea', textAlign: 'center', color: '#888' }}>
              <p style={{ margin: 0 }}>You haven't added any products yet..</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;