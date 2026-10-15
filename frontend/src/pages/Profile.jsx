import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const res = await api.get('products/');
        const products = res.data.results || res.data;
        const userProducts = products.filter((p) => p.owner?.username === user?.username);
        setProductCount(userProducts.length);
      } catch (err) {
        console.error('Error loading profile statistics', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserStats();
    }
  }, [user]);

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '40px', background: '#fff', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', border: '1px solid #eaeaea' }}>
      <h2 style={{ marginTop: 0, marginBottom: '25px', color: '#1a1a1a', fontSize: '26px', borderBottom: '2px solid #f8f9fa', paddingBottom: '15px' }}>
        Personal Account
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={{ background: '#fdfbf7', padding: '20px', borderRadius: '12px', border: '1px solid #faedcd' }}>
          <p style={{ margin: '0 0 5px 0', color: '#8c7a6b', fontSize: '14px', fontWeight: '500' }}>Username</p>
          <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#1a1a1a' }}>{user?.username}</p>
        </div>

        <div style={{ background: '#fdfbf7', padding: '20px', borderRadius: '12px', border: '1px solid #faedcd' }}>
          <p style={{ margin: '0 0 5px 0', color: '#8c7a6b', fontSize: '14px', fontWeight: '500' }}>System Role</p>
          <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#D97706' }}>{user?.role || 'User'}</p>
        </div>
      </div>

      <div style={{ background: '#fdfbf7', padding: '20px', borderRadius: '12px', border: '1px solid #faedcd', marginBottom: '20px' }}>
        <p style={{ margin: '0 0 5px 0', color: '#8c7a6b', fontSize: '14px', fontWeight: '500' }}>Contact Email</p>
        <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#1a1a1a' }}>
          {user?.email || 'Email not specified'}
        </p>
      </div>

      <div style={{ background: '#fdfbf7', padding: '20px', borderRadius: '12px', border: '1px solid #faedcd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: '0 0 5px 0', color: '#8c7a6b', fontSize: '14px', fontWeight: '500' }}>Published Products</p>
          <p style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#16a34a' }}>
            {loading ? 'Loading...' : productCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;