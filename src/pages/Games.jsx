import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GameCard from '../components/GameCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { fetchAllGames, searchGamesThunk } from '../redux/slices/gamesSlice';

export default function Games() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Obtener parámetros de la URL
  const pageFromUrl = parseInt(searchParams.get('page')) || 1;
  const searchFromUrl = searchParams.get('q') || '';
  
  // Obtener estado de Redux
  const { allGames, loading, currentSearchQuery } = useSelector((state) => state.games);
  const totalCount = useSelector((state) => state.games.allGames.length); // Nota: esto es aproximado
  
  // Estado local
  const [resetButtonHovered, setResetButtonHovered] = useState(false);
  const [searching, setSearching] = useState(searchFromUrl !== '');

  // Fetch inicial y cuando cambia la URL
  useEffect(() => {
    const currentPage = pageFromUrl;
    const currentSearch = searchFromUrl;
    
    if (currentSearch) {
      dispatch(searchGamesThunk({ query: currentSearch, page: currentPage }));
      setSearching(true);
    } else {
      dispatch(fetchAllGames(currentPage));
      setSearching(false);
    }
  }, [pageFromUrl, searchFromUrl, dispatch]);

  const handleSearch = (query) => {
    if (query.trim()) {
      setSearchParams({ q: query, page: '1' });
    }
  };

  const handleResetSearch = () => {
    setSearching(false);
    setSearchParams({});
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0) {
      if (searching && searchFromUrl) {
        setSearchParams({ q: searchFromUrl, page: newPage.toString() });
      } else {
        setSearchParams({ page: newPage.toString() });
      }
      window.scrollTo(0, 0);
    }
  };

  // Aproximar total de páginas (RAWG retorna data.count pero solo cargamos 20 por página)
  const totalPages = searching ? Math.ceil(100 / 20) : Math.ceil(totalCount / 20) || 1;

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
    resetButtonHover: {
      backgroundColor: '#4b5563',
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
    gamesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginBottom: '3rem',
      gridAutoRows: '1fr',
      minHeight: '300px',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>
          {searching ? `Resultados para: "${searchFromUrl}"` : 'Todos los Videojuegos'}
        </h1>

        <SearchBar onSearch={handleSearch} />

        {searching && (
          <button
            onClick={handleResetSearch}
            style={{
              ...styles.resetButton,
              ...(resetButtonHovered && styles.resetButtonHover),
            }}
            onMouseEnter={() => setResetButtonHovered(true)}
            onMouseLeave={() => setResetButtonHovered(false)}
          >
            ← Volver a todos los juegos
          </button>
        )}

        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingText}>Cargando juegos...</div>
          </div>
        ) : allGames.length === 0 ? (
          <div style={styles.noResultsContainer}>
            <div style={styles.noResultsText}>No se encontraron juegos</div>
          </div>
        ) : (
          <>
            <div style={styles.gamesGrid}>
              {allGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            {/* Paginación con el componente reutilizable */}
            {totalPages > 1 && (
              <Pagination
                currentPage={pageFromUrl}
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
