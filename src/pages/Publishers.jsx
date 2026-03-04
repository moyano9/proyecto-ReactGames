import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PublisherCard from '../components/PublisherCard';
import Pagination from '../components/Pagination';
import { fetchPublishers, searchPublishersThunk } from '../redux/slices/gamesSlice';

/**
 * Publishers - Página que muestra publishers con búsqueda y paginación
 * Se accede a través de /publishers
 */
export default function Publishers() {
  const dispatch = useDispatch();
  
  // Estado del componente desde Redux
  const { publishers, loading, currentPage } = useSelector((state) => state.games);
  
  // Estado local
  const [page, setPage] = useState(currentPage || 1);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  
  // Total aproximado de publishers (RAWG limita resultados)
  const totalCount = 300;
  const totalPages = Math.ceil(totalCount / 20);

  // Cargar los datos cuando cambia la página o búsqueda
  useEffect(() => {
    if (searching && searchQuery) {
      dispatch(searchPublishersThunk({ query: searchQuery, page }));
    } else {
      dispatch(fetchPublishers(page));
    }
  }, [page, searching, searchQuery, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInputValue.trim()) {
      setSearchQuery(searchInputValue);
      setSearching(true);
      setPage(1);
    }
  };

  const handleResetSearch = () => {
    setSearching(false);
    setSearchQuery('');
    setSearchInputValue('');
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  // Estilos del componente
  const styles = {
    page: {
      backgroundColor: '#111827',
      minHeight: '100vh',
      padding: '3rem 1rem',
      marginTop: '80px',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: '2rem',
    },
    searchForm: {
      display: 'flex',
      gap: '0.75rem',
      marginBottom: '2rem',
      flexWrap: 'wrap',
    },
    searchInput: {
      flex: 1,
      minWidth: '250px',
      padding: '0.75rem 1rem',
      backgroundColor: '#1f2937',
      border: '1px solid #374151',
      borderRadius: '0.5rem',
      color: '#ffffff',
      fontSize: '1rem',
    },
    searchButton: {
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontWeight: 'bold',
    },
    resetButton: {
      marginBottom: '1.5rem',
      backgroundColor: '#374151',
      color: '#ffffff',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '256px',
    },
    loadingText: {
      color: '#ffffff',
      fontSize: '1.25rem',
    },
    noResultsContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '256px',
    },
    noResultsText: {
      color: '#9ca3af',
      fontSize: '1.25rem',
    },
    publishersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginBottom: '3rem',
      gridAutoRows: '1fr',
      minHeight: '300px',
    },
  };

  const [searchButtonHovered, setSearchButtonHovered] = useState(false);
  const [resetButtonHovered, setResetButtonHovered] = useState(false);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>
          {searching ? `Resultados para: "${searchQuery}"` : 'Publishers'}
        </h1>

        {/* Barra de búsqueda */}
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Buscar publishers..."
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            style={styles.searchInput}
          />
          <button
            type="submit"
            style={{
              ...styles.searchButton,
              backgroundColor: searchButtonHovered ? '#6d28d9' : '#7c3aed',
            }}
            onMouseEnter={() => setSearchButtonHovered(true)}
            onMouseLeave={() => setSearchButtonHovered(false)}
          >
            🔍 Buscar
          </button>
        </form>

        {/* Botón para resetear búsqueda */}
        {searching && (
          <button
            onClick={handleResetSearch}
            style={{
              ...styles.resetButton,
              backgroundColor: resetButtonHovered ? '#4b5563' : '#374151',
            }}
            onMouseEnter={() => setResetButtonHovered(true)}
            onMouseLeave={() => setResetButtonHovered(false)}
          >
            ← Ver todos los publishers
          </button>
        )}

        {/* Contenido principal */}
        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingText}>Cargando publishers...</div>
          </div>
        ) : publishers.length === 0 ? (
          <div style={styles.noResultsContainer}>
            <div style={styles.noResultsText}>No se encontraron publishers</div>
          </div>
        ) : (
          <>
            <div style={styles.publishersGrid}>
              {publishers.map((publisher) => (
                <PublisherCard key={publisher.id} publisher={publisher} />
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                loading={loading}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
