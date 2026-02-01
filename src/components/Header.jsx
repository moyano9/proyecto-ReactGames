import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Header - Barra de navegación del sitio
 * Muestra el logo y links a las diferentes páginas
 * También muestra el contador de favoritos
 */
export default function Header() {
  // Contador de juegos en favoritos
  const [favorites, setFavorites] = useState(0);

  // Actualizar el contador de favoritos cuando cambien
  useEffect(() => {
    const updateFavoriteCount = () => {
      const fav = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(fav.length);
    };

    updateFavoriteCount();
    
    // Escuchar cambios en localStorage desde otras pestañas
    window.addEventListener('storage', updateFavoriteCount);
    
    // Limpiar el evento al desmontar el componente
    return () => window.removeEventListener('storage', updateFavoriteCount);
  }, []);

  // Estilos del componente
  const styles = {
    header: {
      backgroundColor: '#1f2937',
      color: '#ffffff',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
      padding: '1rem 2rem',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#a78bfa',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    nav: {
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'center',
    },
    navLink: {
      color: '#ffffff',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'color 0.3s',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
    },
    navLinkHover: {
      color: '#c4b5fd',
    },
    favoritesButton: {
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: 'bold',
    },
    badge: {
      backgroundColor: '#ef4444',
      color: '#ffffff',
      borderRadius: '50%',
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      fontWeight: 'bold',
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo del sitio */}
        <Link to="/" style={styles.logo}>
          🎮 GameVerse
        </Link>

        {/* Menú de navegación */}
        <nav style={styles.nav}>
          {/* Link a la página de inicio */}
          <NavLink to="/" label="Inicio" />

          {/* Link a la página de juegos */}
          <NavLink to="/games" label="Juegos" />

          {/* Link a favoritos con contador */}
          <Link 
            to="/favorites" 
            style={styles.favoritesButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#6d28d9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#7c3aed'}
          >
            ❤️ Favoritos
            {favorites > 0 && <span style={styles.badge}>{favorites}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}

/**
 * Componente auxiliar para los links de navegación
 * Agregamos el efecto hover de forma más clara
 */
function NavLink({ to, label }) {
  const [isHovered, setIsHovered] = React.useState(false);

  const styles = {
    link: {
      color: isHovered ? '#c4b5fd' : '#ffffff',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'color 0.3s',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
    },
  };

  return (
    <Link 
      to={to} 
      style={styles.link}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </Link>
  );
}
