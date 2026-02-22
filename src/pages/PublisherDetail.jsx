import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';
import { getPublisherDetails, getGamesByPublisher } from '../services/api';

/**
 * PublisherDetail - Página que muestra los detalles de un publisher y sus juegos
 * Se accede a través de /publisher/:publisherId
 */
export default function PublisherDetail() {
  // Obtener el ID del publisher desde la URL
  const { publisherId } = useParams();
  const navigate = useNavigate();

  // Estado del componente
  const [publisher, setPublisher] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Cargar datos del publisher y sus juegos
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Cargar información del publisher
      const publisherData = await getPublisherDetails(publisherId);
      setPublisher(publisherData);

      // Cargar juegos del publisher
      const gamesData = await getGamesByPublisher(publisherId, page);
      setGames(gamesData.results);
      setTotalCount(gamesData.count);
      setLoading(false);
    };
    fetchData();
  }, [publisherId, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(totalCount / 20);

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
    backButton: {
      marginBottom: '1.5rem',
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    headerCard: {
      backgroundColor: '#1f2937',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      boxShadow: '0 20px 25px rgba(0, 0, 0, 0.5)',
      marginBottom: '2rem',
      padding: '2rem',
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: '1rem',
    },
    info: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      marginBottom: '2rem',
    },
    infoSection: {
      marginBottom: '1rem',
    },
    infoLabel: {
      fontSize: '0.875rem',
      color: '#9ca3af',
      marginBottom: '0.25rem',
    },
    infoValue: {
      fontSize: '1.25rem',
      color: '#ffffff',
      fontWeight: 'bold',
    },
    gamesTitle: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: '2rem',
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

  if (loading && !publisher) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingContainer}>
          <div style={styles.loadingText}>⏳ Cargando información del publisher...</div>
        </div>
      </div>
    );
  }

  if (!publisher) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingContainer}>
          <div style={styles.loadingText}>❌ Publisher no encontrado</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Botón para volver atrás */}
        <button
          onClick={() => navigate(-1)}
          style={styles.backButton}
        >
          ← Atrás
        </button>

        {/* Card con información del publisher */}
        <div style={styles.headerCard}>
          <h1 style={styles.title}>{publisher.name}</h1>
          
          <div style={styles.info}>
            <div style={styles.infoSection}>
              <p style={styles.infoLabel}>Total de Juegos</p>
              <p style={styles.infoValue}>{publisher.games_count || 0}</p>
            </div>

            {publisher.image_background && (
              <div style={styles.infoSection}>
                <p style={styles.infoLabel}>Publisher Activo</p>
                <p style={styles.infoValue}>✓ {new Date(publisher.updated).getFullYear()}</p>
              </div>
            )}
          </div>

          {publisher.description && (
            <div>
              <p style={{ ...styles.infoLabel, marginBottom: '0.5rem' }}>Descripción</p>
              <p style={{ color: '#d1d5db', lineHeight: '1.5' }}>
                {publisher.description.replace(/<[^>]*>/g, '')}
              </p>
            </div>
          )}
        </div>

        {/* Juegos del publisher */}
        <h2 style={styles.gamesTitle}>Videojuegos del Publisher</h2>

        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingText}>Cargando juegos...</div>
          </div>
        ) : games.length === 0 ? (
          <div style={styles.noResultsContainer}>
            <div style={styles.noResultsText}>No se encontraron juegos para este publisher</div>
          </div>
        ) : (
          <>
            <div style={styles.gamesGrid}>
              {games.map((game) => (
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
