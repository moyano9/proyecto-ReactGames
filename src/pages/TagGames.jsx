import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';
import { fetchGamesByTag, fetchTagDetails } from '../redux/slices/gamesSlice';

/**
 * TagGames - Página que muestra juegos filtrados por tag/género
 * Se accede a través de /tag/:tagId
 */
export default function TagGames() {
  // Obtener el ID del tag desde la URL
  const { tagId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Estado del componente desde Redux
  const { gamesByTag, tagDetails, loading } = useSelector((state) => state.games);
  
  // Estado local para paginación
  const [page, setPage] = useState(1);
  const totalCount = 100; // Aproximado ya que RAWG limita resultados
  const totalPages = Math.ceil(totalCount / 20);

  // Cargar datos del tag y sus juegos
  useEffect(() => {
    dispatch(fetchTagDetails(tagId));
    dispatch(fetchGamesByTag({ tagId, page }));
  }, [tagId, dispatch]);

  // Cuando cambia la página
  useEffect(() => {
    dispatch(fetchGamesByTag({ tagId, page }));
  }, [page, tagId, dispatch]);

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
    header: {
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    backButton: {
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      color: '#ffffff',
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
        {/* Header con botón atrás */}
        <div style={styles.header}>
          <button
            onClick={() => navigate(-1)}
            style={styles.backButton}
          >
            ← Atrás
          </button>
          <h1 style={styles.title}>
            {tagDetails ? `Tag: ${tagDetails.name}` : 'Cargando...'}
          </h1>
        </div>

        {/* Contenido principal */}
        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingText}>Cargando juegos...</div>
          </div>
        ) : gamesByTag.length === 0 ? (
          <div style={styles.noResultsContainer}>
            <div style={styles.noResultsText}>No se encontraron juegos para este tag</div>
          </div>
        ) : (
          <>
            <div style={styles.gamesGrid}>
              {gamesByTag.map((game) => (
                <GameCard key={game.id} game={game} />
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
