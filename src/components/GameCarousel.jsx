import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';

export default function GameCarousel({ games }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gamesPerView] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(games.length / gamesPerView));
    }, 5000);
    return () => clearInterval(timer);
  }, [games.length, gamesPerView]);

  const visibleGames = games.slice(
    currentIndex * gamesPerView,
    currentIndex * gamesPerView + gamesPerView
  );

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(games.length / gamesPerView));
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.ceil(games.length / gamesPerView)) %
        Math.ceil(games.length / gamesPerView)
    );
  };

  const styles = {
    container: {
      background: 'linear-gradient(to bottom, #374151, #1f2937)',
      padding: '2rem 1rem',
    },
    wrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: '2rem',
    },
    carouselWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    button: {
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#6d28d9',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      flex: 1,
    },
  };

  const [buttonHovered, setButtonHovered] = useState(null);

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h2 style={styles.title}>🔥 Juegos Populares</h2>
        <div style={styles.carouselWrapper}>
          <button
            onClick={prevSlide}
            style={{
              ...styles.button,
              ...(buttonHovered === 'prev' && styles.buttonHover),
            }}
            onMouseEnter={() => setButtonHovered('prev')}
            onMouseLeave={() => setButtonHovered(null)}
          >
            ← Anterior
          </button>

          <div style={styles.gridContainer}>
            {visibleGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          <button
            onClick={nextSlide}
            style={{
              ...styles.button,
              ...(buttonHovered === 'next' && styles.buttonHover),
            }}
            onMouseEnter={() => setButtonHovered('next')}
            onMouseLeave={() => setButtonHovered(null)}
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
