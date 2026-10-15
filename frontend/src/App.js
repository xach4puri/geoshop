import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProductEdit from './pages/ProductEdit';

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header style={{ 
      background: '#ffffff', 
      borderBottom: '1px solid #eaeaea', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '16px 20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <Link to="/" style={{ 
            fontWeight: '800', 
            fontSize: '22px', 
            color: '#1a1a1a', 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ 
              background: '#F59E0B', 
              color: '#1a1a1a', 
              padding: '4px 10px', 
              borderRadius: '8px', 
              fontSize: '18px' 
            }}>
              Geo
            </span>
            <span>Shop</span>
          </Link>

          <nav style={{ display: 'flex', gap: '20px' }}>
            <Link to="/" style={{ color: '#444', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>
              Homepage
            </Link>
            <Link to="/catalog" style={{ color: '#444', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>
              Catalog
            </Link>
          </nav>
        </div>

        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {user ? (
            <>
              <Link to="/dashboard" style={{ color: '#1a1a1a', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>
                Dashboard
              </Link>
              <Link to="/profile" style={{ 
                background: '#fdfbf7', 
                border: '1px solid #faedcd', 
                padding: '8px 16px', 
                borderRadius: '20px', 
                color: '#D97706', 
                textDecoration: 'none', 
                fontWeight: '600',
                fontSize: '14px' 
              }}>
                👤 {user.username}
              </Link>
              <button 
                onClick={logout} 
                style={{ 
                  background: '#fee2e2', 
                  color: '#dc2626', 
                  border: 'none', 
                  padding: '8px 16px', 
                  borderRadius: '8px', 
                  fontWeight: '600', 
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'background 0.2s' 
                }}
                onMouseEnter={(e) => e.target.style.background = '#fecaca'}
                onMouseLeave={(e) => e.target.style.background = '#fee2e2'}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: '#1a1a1a', textDecoration: 'none', fontWeight: '600', fontSize: '15px', padding: '8px 16px' }}>
                Log In
              </Link>
              <Link to="/register" style={{ 
                background: '#F59E0B', 
                color: '#1a1a1a', 
                textDecoration: 'none', 
                fontWeight: 'bold', 
                fontSize: '14px', 
                padding: '8px 18px', 
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(245, 158, 11, 0.2)',
                transition: 'background 0.2s' 
              }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer style={{ 
      background: '#1a1a1a', 
      color: '#a3a3a3', 
      padding: '50px 20px 20px 20px', 
      marginTop: '80px',
      borderTop: '4px solid #F59E0B'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '40px',
        marginBottom: '40px' 
      }}>
        
        <div>
          <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '15px' }}>
            <span style={{ color: '#F59E0B' }}>Geo</span>Shop
          </h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#a3a3a3' }}>
            A convenient and modern marketplace for buying and selling goods. The best offers from verified sellers.
          </p>
        </div>

        
        <div>
          <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '15px' }}>Navigation</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <li><Link to="/" style={{ color: '#a3a3a3', textDecoration: 'none' }}>Home</Link></li>
            <li><Link to="/catalog" style={{ color: '#a3a3a3', textDecoration: 'none' }}>Product Catalog</Link></li>
            <li><Link to="/register" style={{ color: '#a3a3a3', textDecoration: 'none' }}>Become a Seller</Link></li>
          </ul>
        </div>

        
        <div>
          <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '15px' }}>Contacts</h4>
          <p style={{ fontSize: '14px', margin: '0 0 10px 0' }}>📍 Tbilisi, Georgia</p>
          <p style={{ fontSize: '14px', margin: '0 0 10px 0' }}>✉️ support@geoshop.ge</p>
          <p style={{ fontSize: '14px', margin: 0 }}>📞 +995 (32) 200-00-00</p>
        </div>
      </div>

    </footer>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fafafa' }}>
          <Navigation />
          <main style={{ flex: 1, padding: '20px 0' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route path="/products/new" element={<ProductEdit />} />
              <Route path="/products/:id/edit" element={<ProductEdit />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;