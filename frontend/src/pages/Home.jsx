import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '80px auto', padding: '60px 40px', textAlign: 'center', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
      <h1 style={{ fontSize: '42px', marginBottom: '20px', color: '#1a1a1a', fontWeight: '800' }}>
        Welcome to <span style={{ color: '#D97706' }}>GeoShop</span>!
      </h1>
      <p style={{ fontSize: '18px', color: '#6c757d', marginBottom: '40px', lineHeight: '1.6', maxWidth: '650px', margin: '0 auto 40px auto' }}>
        A modern platform for easily finding products, ensuring fair deals, and quickly publishing your offers. Find the best deals or sell your own items!
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <Link 
          to="/catalog" 
          style={{ 
            background: '#F59E0B', 
            color: '#1a1a1a', 
            padding: '14px 28px', 
            borderRadius: '10px', 
            textDecoration: 'none', 
            fontWeight: 'bold',
            fontSize: '16px',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#E08E0B'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#F59E0B'}
        >
          Go to Directory
        </Link>
        <Link 
          to="/register" 
          style={{ 
            background: '#fff', 
            color: '#1a1a1a', 
            border: '2px solid #eaeaea',
            padding: '14px 28px', 
            borderRadius: '10px', 
            textDecoration: 'none', 
            fontWeight: 'bold',
            fontSize: '16px',
            transition: 'border-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#F59E0B'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#eaeaea'}
        >
          Become a Seller
        </Link>
      </div>
    </div>
  );
};

export default Home;