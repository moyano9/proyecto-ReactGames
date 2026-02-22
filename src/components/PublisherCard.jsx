import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * PublisherCard - Componente que muestra una tarjeta de un publisher
 * 
 * Props:
 * - publisher: Objeto con datos del publisher (name, games_count, etc)
 */
export default function PublisherCard({ publisher }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    card: {
      backgroundColor: '#1f2937',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      cursor: 'pointer',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.3)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      boxShadow: isHovered 
        ? '0 20px 25px rgba(0, 0, 0, 0.5)' 
        : '0 10px 15px rgba(0, 0, 0, 0.3)',
    },
    imageContainer: {
      height: '150px',
      backgroundColor: '#111827',
      overflow: 'hidden',
      flexShrink: 0,
      position: 'relative',
      backgroundImage: publisher.image_background
        ? `url(${publisher.image_background})`
        : 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.3)',
      transition: 'background-color 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    name: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: '1.125rem',
      marginBottom: '0.75rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      display: '-webkit-box',
    },
    stats: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      marginTop: 'auto',
    },
    statItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '0.875rem',
    },
    statLabel: {
      color: '#9ca3af',
    },
    statValue: {
      color: '#a78bfa',
      fontWeight: 'bold',
    },
  };

  const handleClick = () => {
    navigate(`/publisher/${publisher.id}`);
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div style={styles.imageContainer}>
        <div style={styles.imageOverlay}>
          {!publisher.image_background && (
            <span style={{ color: '#ffffff', fontSize: '2.5rem' }}>🎮</span>
          )}
        </div>
      </div>
      
      <div style={styles.content}>
        <h3 style={styles.name}>{publisher.name}</h3>
        
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Juegos</span>
            <span style={styles.statValue}>{publisher.games_count || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
