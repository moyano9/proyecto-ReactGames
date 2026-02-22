import React, { useState } from 'react';

/**
 * Pagination - Componente reutilizable de paginación
 * 
 * Props:
 * - currentPage: número de página actual
 * - totalPages: número total de páginas
 * - onPageChange: función callback cuando cambia la página
 * - loading: si está cargando (desactiva botones)
 */
export default function Pagination({ currentPage, totalPages, onPageChange, loading = false }) {
  const [nextButtonHovered, setNextButtonHovered] = useState(false);
  const [prevButtonHovered, setPrevButtonHovered] = useState(false);

  const styles = {
    paginationContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      alignItems: 'center',
      padding: '2rem 0',
    },
    paginationButton: {
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontWeight: 'bold',
    },
    paginationButtonDisabled: {
      backgroundColor: '#4b5563',
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    paginationButtonHover: {
      backgroundColor: '#6d28d9',
    },
    paginationText: {
      color: '#ffffff',
      fontWeight: 'bold',
      minWidth: '150px',
      textAlign: 'center',
    },
  };

  const handlePrevious = () => {
    if (currentPage > 1 && !loading) {
      onPageChange(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !loading) {
      onPageChange(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div style={styles.paginationContainer}>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1 || loading}
        style={{
          ...styles.paginationButton,
          ...(currentPage === 1 || loading ? styles.paginationButtonDisabled : {}),
          ...(prevButtonHovered && currentPage !== 1 && !loading ? styles.paginationButtonHover : {}),
        }}
        onMouseEnter={() => setPrevButtonHovered(true)}
        onMouseLeave={() => setPrevButtonHovered(false)}
      >
        ← Anterior
      </button>

      <span style={styles.paginationText}>
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages || loading}
        style={{
          ...styles.paginationButton,
          ...(currentPage === totalPages || loading ? styles.paginationButtonDisabled : {}),
          ...(nextButtonHovered && currentPage !== totalPages && !loading ? styles.paginationButtonHover : {}),
        }}
        onMouseEnter={() => setNextButtonHovered(true)}
        onMouseLeave={() => setNextButtonHovered(false)}
      >
        Siguiente →
      </button>
    </div>
  );
}
