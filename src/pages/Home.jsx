import React, { useState, useEffect } from 'react';
import GameCarousel from '../components/GameCarousel';
import { getPopularGames } from '../services/api';

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      const data = await getPopularGames();
      setGames(data);
      setLoading(false);
    };
    fetchGames();
  }, []);

  const styles = {
    page: {
      backgroundColor: '#111827',
      minHeight: '100vh',
      marginTop: '80px',
    },
    hero: {
      background: 'linear-gradient(to right, #6d28d9, #7c3aed, #1e40af)',
      padding: '5rem 1rem',
      textAlign: 'center',
    },
    heroContent: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    heroTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: '1rem',
    },
    heroSubtitle: {
      fontSize: '1.25rem',
      color: '#d1d5db',
      marginBottom: '1.5rem',
    },
    heroButton: {
      display: 'inline-block',
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      fontWeight: 'bold',
      padding: '0.75rem 2rem',
      borderRadius: '0.5rem',
      textDecoration: 'none',
      transition: 'background-color 0.3s',
      cursor: 'pointer',
      border: 'none',
      fontSize: '1rem',
    },
    heroButtonHover: {
      backgroundColor: '#6d28d9',
    },
    featuresSection: {
      backgroundColor: '#1f2937',
      padding: '4rem 1rem',
    },
    featuresSectionContent: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    featuresTitle: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: '3rem',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
    },
    featureCard: {
      backgroundColor: '#111827',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      textAlign: 'center',
    },
    featureEmoji: {
      fontSize: '2rem',
      marginBottom: '1rem',
    },
    featureCardTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: '0.5rem',
    },
    featureCardText: {
      color: '#9ca3af',
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
  };

  const [isButtonHovered, setIsButtonHovered] = useState(false);

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingContainer}>
          <div style={styles.loadingText}>Cargando juegos...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Sección Hero */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>¡Bienvenido a GameVerse!</h1>
          <p style={styles.heroSubtitle}>
            Descubre miles de videojuegos, explora géneros y encuentra tu próximo juego favorito
          </p>
          <a
            href="/games"
            style={{
              ...styles.heroButton,
              ...(isButtonHovered && styles.heroButtonHover),
            }}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            Explorar Juegos →
          </a>
        </div>
      </div>

      {/* Carrusel de Juegos Populares */}
      <GameCarousel games={games} />

      {/* Sección de Características */}
      <div style={styles.featuresSection}>
        <div style={styles.featuresSectionContent}>
          <h2 style={styles.featuresTitle}>¿Por qué GameVerse?</h2>
          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureEmoji}>🔍</div>
              <h3 style={styles.featureCardTitle}>Búsqueda Avanzada</h3>
              <p style={styles.featureCardText}>
                Encuentra juegos por nombre, género o plataforma con nuestra poderosa búsqueda
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureEmoji}>⭐</div>
              <h3 style={styles.featureCardTitle}>Información Detallada</h3>
              <p style={styles.featureCardText}>
                Accede a reseñas, géneros, plataformas y mucha más información de cada juego
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureEmoji}>❤️</div>
              <h3 style={styles.featureCardTitle}>Marca Favoritos</h3>
              <p style={styles.featureCardText}>
                Guarda tus juegos favoritos para acceder a ellos fácilmente cuando quieras
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
