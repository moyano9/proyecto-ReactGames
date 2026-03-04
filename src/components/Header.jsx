import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Header - Barra de navegación del sitio
 * Muestra el logo y links a las diferentes páginas
 * También muestra el contador de favoritos y menú de usuario
 */
export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Obtener cantidad de favoritos de Redux
  const favorites = useSelector((state) => state.games.favorites);
  const attendingEvents = useSelector((state) => state.events.attendingEvents);
  
  const favoriteCount = favorites.length;
  const eventCount = attendingEvents.length;

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
    userButton: {
      backgroundColor: '#6366f1',
      color: '#ffffff',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '1.25rem',
      transition: 'background-color 0.3s',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    userMenu: {
      position: 'absolute',
      top: '50px',
      right: 0,
      backgroundColor: '#111827',
      border: '1px solid #374151',
      borderRadius: '0.5rem',
      minWidth: '200px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
      zIndex: 101,
    },
    menuItem: {
      display: 'block',
      width: '100%',
      padding: '0.75rem 1rem',
      color: '#ffffff',
      textDecoration: 'none',
      borderBottom: '1px solid #374151',
      transition: 'background-color 0.3s',
      textAlign: 'left',
      fontSize: '0.875rem',
    },
    menuItemHover: {
      backgroundColor: '#1f2937',
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

          {/* Link a la página de eventos */}
          <NavLink to="/events" label="Eventos" />

          {/* Link a la página de publishers */}
          <NavLink to="/publishers" label="Publishers" />

          {/* Link a favoritos con contador */}
          <Link 
            to="/favorites" 
            style={styles.favoritesButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#6d28d9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#7c3aed'}
          >
            ❤️ Favoritos
            {favoriteCount > 0 && <span style={styles.badge}>{favoriteCount}</span>}
          </Link>

          {/* Botón de usuario con menú desplegable */}
          <div style={{ position: 'relative' }}>
            <button
              style={styles.userButton}
              onClick={() => setShowUserMenu(!showUserMenu)}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#4f46e5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#6366f1'}
              title="Menú de usuario"
            >
              👤
            </button>

            {showUserMenu && (
              <div style={styles.userMenu}>
                <Link
                  to="/favorites"
                  style={styles.menuItem}
                  onMouseEnter={(e) => Object.assign(e.target.style, styles.menuItemHover)}
                  onMouseLeave={(e) => Object.assign(e.target.style, { backgroundColor: 'transparent' })}
                  onClick={() => setShowUserMenu(false)}
                >
                  ❤️ Mis Favoritos ({favoriteCount})
                </Link>
                <Link
                  to="/my-events"
                  style={styles.menuItem}
                  onMouseEnter={(e) => Object.assign(e.target.style, styles.menuItemHover)}
                  onMouseLeave={(e) => Object.assign(e.target.style, { backgroundColor: 'transparent' })}
                  onClick={() => setShowUserMenu(false)}
                >
                  📅 Mis Eventos ({eventCount})
                </Link>
                <button
                  style={{...styles.menuItem, color: '#ef4444'}}
                  onMouseEnter={(e) => Object.assign(e.target.style, styles.menuItemHover)}
                  onMouseLeave={(e) => Object.assign(e.target.style, { backgroundColor: 'transparent' })}
                  onClick={() => {
                    setShowUserMenu(false);
                    // Aquí iría la lógica de logout si existe
                  }}
                >
                  🚪 Cerrar sesión
                </button>
              </div>
            )}
          </div>
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
