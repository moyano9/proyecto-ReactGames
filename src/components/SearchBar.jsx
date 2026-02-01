import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const styles = {
    form: {
      marginBottom: '2rem',
    },
    container: {
      display: 'flex',
      gap: '0.5rem',
    },
    input: {
      flex: 1,
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      backgroundColor: '#374151',
      color: '#ffffff',
      border: 'none',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border 0.3s',
    },
    inputFocus: {
      boxShadow: '0 0 0 2px #7c3aed',
    },
    button: {
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#6d28d9',
    },
  };

  const [isFocused, setIsFocused] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.container}>
        <input
          type="text"
          placeholder="Busca un videojuego..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            ...styles.input,
            ...(isFocused && styles.inputFocus),
          }}
        />
        <button
          type="submit"
          style={{
            ...styles.button,
            ...(isButtonHovered && styles.buttonHover),
          }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          🔍 Buscar
        </button>
      </div>
    </form>
  );
}
