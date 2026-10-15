import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  
  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || '';
  const orderingQuery = searchParams.get('ordering') || '';
  const pageQuery = searchParams.get('page') || '1';

  
  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  
  useEffect(() => {
    api.get('categories/')
      .then(res => setCategories(res.data.results || res.data))
      .catch(err => console.error('Ошибка загрузки категорий', err));
  }, []);

 
  useEffect(() => {
    const fetchCatalogData = async () => {
      setLoading(true);
      try {
        let url = `products/?page=${pageQuery}&`;
        if (searchQuery) url += `search=${searchQuery}&`;
        if (selectedCategory) url += `category=${selectedCategory}&`;
        if (orderingQuery) url += `ordering=${orderingQuery}&`;

        const res = await api.get(url);
        setProducts(res.data.results || res.data);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
      } catch (err) {
        console.error('catalog loading error', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogData();
  }, [searchQuery, selectedCategory, orderingQuery, pageQuery]);

  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput) {
      params.set('search', searchInput);
    } else {
      params.delete('search');
    }
    params.delete('page'); 
    setSearchParams(params);
  };

  
  const handleCategoryChange = (categoryName) => {
    const params = new URLSearchParams(searchParams);
    if (categoryName) {
      params.set('category', categoryName);
    } else {
      params.delete('category');
    }
    params.delete('page'); 
    setSearchParams(params);
  };

  
  const handleOrderingChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('ordering', value);
    } else {
      params.delete('ordering');
    }
    setSearchParams(params);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '28px', color: '#1a1a1a' }}>Product Catalog</h2>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          
          <select 
            value={orderingQuery} 
            onChange={handleOrderingChange}
            style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #ced4da', background: '#fff', outline: 'none', cursor: 'pointer' }}
          >
            <option value="">Default Sorting</option>
            <option value="-created_at">Newest First</option>
            <option value="price">Lowest Price First</option>
            <option value="-price">Highest Price First</option>
          </select>

          
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="searching for products..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{ padding: '10px 14px', width: '240px', borderRadius: '8px', border: '1px solid #ced4da', outline: 'none' }}
            />
            <button 
              type="submit" 
              style={{ padding: '10px 20px', background: '#F59E0B', color: '#1a1a1a', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Search
            </button>
          </form>
        </div>
      </div>

      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', overflowX: 'auto', paddingBottom: '5px' }}>
        <button 
          onClick={() => handleCategoryChange('')}
          style={{ 
            padding: '8px 16px', 
            borderRadius: '20px', 
            border: '1px solid #eaeaea', 
            background: selectedCategory === '' ? '#F59E0B' : '#fff', 
            color: selectedCategory === '' ? '#1a1a1a' : '#555',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          All Caterogories
        </button>
        {categories.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => handleCategoryChange(cat.name)}
            style={{ 
              padding: '8px 16px', 
              borderRadius: '20px', 
              border: '1px solid #eaeaea', 
              background: selectedCategory === cat.name ? '#F59E0B' : '#fff', 
              color: selectedCategory === cat.name? '#1a1a1a' : '#555',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#666', fontSize: '16px' }}>Loading Catalog...</div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {products.length > 0 ? (
              products.map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => navigate(`/products/${product.id}`)}
                  style={{ 
                    border: '1px solid #eaeaea', 
                    borderRadius: '16px', 
                    padding: '24px', 
                    background: '#fff', 
                    boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#1a1a1a' }}>{product.title}</h3>
                    <p style={{ color: '#6c757d', fontSize: '14px', lineHeight: '1.5', marginBottom: '20px', height: '42px', overflow: 'hidden' }}>
                      {product.description}
                    </p>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#16a34a' }}>{product.price} ₾</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#adb5bd', borderTop: '1px solid #f8f9fa', paddingTop: '12px' }}>
                      <span>Seller: {product.owner?.username || 'shop'}</span>
                      <span>{new Date(product.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: '#666', background: '#fff', borderRadius: '16px', border: '1px solid #eaeaea' }}>
                <p style={{ fontSize: '16px', margin: 0 }}>Products Not Found</p>
              </div>
            )}
          </div>

          
          {(nextPage || prevPage) && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '40px' }}>
              <button
                disabled={!prevPage}
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  const newPage = Number(pageQuery) - 1;
                  if (newPage > 1) params.set('page', newPage);
                  else params.delete('page');
                  setSearchParams(params);
                }}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: '1px solid #ced4da',
                  background: prevPage ? '#fff' : '#f8f9fa',
                  color: prevPage ? '#1a1a1a' : '#adb5bd',
                  cursor: prevPage ? 'pointer' : 'not-allowed',
                  fontWeight: '600'
                }}
              >
                Prev
              </button>

              <span style={{ fontWeight: '600', color: '#444' }}>
                Page {pageQuery}
              </span>

              <button
                disabled={!nextPage}
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.set('page', Number(pageQuery) + 1);
                  setSearchParams(params);
                }}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: '1px solid #ced4da',
                  background: nextPage ? '#fff' : '#f8f9fa',
                  color: nextPage ? '#1a1a1a' : '#adb5bd',
                  cursor: nextPage ? 'pointer' : 'not-allowed',
                  fontWeight: '600'
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Catalog;