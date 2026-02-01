import { useState, useEffect } from 'react';

/**
 * Hook personalizado para gestionar favoritos
 * Encapsula toda la lógica de favoritos en un solo lugar
 * 
 * @returns {Object} { favorites, isFavorite, toggleFavorite }
 */
export function useFavorites(gameId) {
  // Estado local de favoritos (se carga desde localStorage)
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  // Verifica si el juego actual está en favoritos
  const [isFavorite, setIsFavorite] = useState(
    favorites.includes(gameId)
  );

  // Actualiza isFavorite cuando cambian los favoritos
  useEffect(() => {
    setIsFavorite(favorites.includes(gameId));
  }, [favorites, gameId]);

  /**
   * Alterna el estado de favorito (lo agrega o quita)
   */
  const toggleFavorite = () => {
    let newFavorites;

    if (isFavorite) {
      // Si está en favoritos, lo quitamos
      newFavorites = favorites.filter((fav) => fav !== gameId);
    } else {
      // Si no está, lo agregamos
      newFavorites = [...favorites, gameId];
    }

    // Actualizar estado local
    setFavorites(newFavorites);
    setIsFavorite(!isFavorite);

    // Guardar en localStorage (almacenamiento del navegador)
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}
