import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'favorites';

/**
 * Hook personalizado para gestionar favoritos
 * Encapsula toda la lógica de favoritos en un solo lugar
 * Sincroniza automáticamente entre pestañas/ventanas
 * 
 * @param {number} gameId - ID del juego
 * @returns {Object} { favorites, isFavorite, toggleFavorite }
 */
export function useFavorites(gameId) {
  // Función auxiliar para obtener favoritos de localStorage de forma segura
  const getFavoritesFromStorage = () => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error al leer favoritos:', error);
      return [];
    }
  };

  // Estado de favoritos - inicializa desde localStorage
  const [favorites, setFavorites] = useState(getFavoritesFromStorage());

  // Sincronizar con localStorage cuando cambian los favoritos
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Escuchar cambios de localStorage desde otras pestañas/ventanas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === FAVORITES_KEY || e.key === null) {
        setFavorites(getFavoritesFromStorage());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Verificar si el juego está en favoritos
  const isFavorite = favorites.includes(gameId);

  /**
   * Alterna el estado de favorito (lo agrega o quita)
   */
  const toggleFavorite = () => {
    if (isFavorite) {
      // Si está en favoritos, lo quitamos
      setFavorites(favorites.filter((fav) => fav !== gameId));
    } else {
      // Si no está, lo agregamos
      setFavorites([...favorites, gameId]);
    }
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}
