import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import SearchBar from '../components/SearchBar';
import { getAllGames, searchGames } from '../services/api';

export default function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchGames();
  }, [page]);

  const fetchGames = async () => {
    setLoading(true);
    if (searching && searchQuery) {
      const data = await searchGames(searchQuery, page);
      setGames(data.results);
      setTotalCount(data.count);
    } else {
      const data = await getAllGames(page);
      setGames(data.results);
      setTotalCount(data.count);
    }
    setLoading(false);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setSearching(true);
    setPage(1);
    setLoading(true);
    const data = await searchGames(query, 1);
    setGames(data.results);
    setTotalCount(data.count);
    setLoading(false);
  };

  const handleResetSearch = () => {
    setSearching(false);
    setSearchQuery('');
    setPage(1);
    fetchGames();
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const totalPages = Math.ceil(totalCount / 20);

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
    paginationContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      alignItems: 'center',
    },
    paginationButton: {
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    paginationButtonDisabled: {
      backgroundColor: '#4b5563',
      cursor: 'not-allowed',
    },
    paginationButtonHover: {
      backgroundColor: '#6d28d9',
    },
    paginationText: {
      color: '#ffffff',
      fontWeight: 'bold',
    },
  };

  const [resetButtonHovered, setResetButtonHovered] = useState(false);
  const [nextButtonHovered, setNextButtonHovered] = useState(false);
  const [prevButtonHovered, setPrevButtonHovered] = useState(false);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>
          {searching ? `Resultados para: "${searchQuery}"` : 'Todos los Videojuegos'}
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
        ) : games.length === 0 ? (
          <div style={styles.noResultsContainer}>
            <div style={styles.noResultsText}>No se encontraron juegos</div>
          </div>
        ) : (
          <>
            <div style={styles.gamesGrid}>
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            {/* Paginación */}
            <div style={styles.paginationContainer}>
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                style={{
                  ...styles.paginationButton,
                  ...(page === 1 && styles.paginationButtonDisabled),
                  ...(prevButtonHovered && page !== 1 && styles.paginationButtonHover),
                }}
                onMouseEnter={() => setPrevButtonHovered(true)}
                onMouseLeave={() => setPrevButtonHovered(false)}
              >
                ← Anterior
              </button>

              <span style={styles.paginationText}>
                Página {page} de {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                style={{
                  ...styles.paginationButton,
                  ...(page === totalPages && styles.paginationButtonDisabled),
                  ...(nextButtonHovered && page !== totalPages && styles.paginationButtonHover),
                }}
                onMouseEnter={() => setNextButtonHovered(true)}
                onMouseLeave={() => setNextButtonHovered(false)}
              >
                Siguiente →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
