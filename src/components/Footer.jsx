import React from 'react';

export default function Footer() {
  const styles = {
    footer: {
      backgroundColor: '#1f2937',
      color: '#ffffff',
      textAlign: 'center',
      padding: '1.5rem',
      marginTop: '3rem',
    },
    text: {
      color: '#9ca3af',
    },
  };

  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        © 2026 GameVerse - Powered by RAWG API | Descubre los mejores videojuegos
      </p>
    </footer>
  );
}
