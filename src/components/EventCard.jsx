export default function EventCard({ event, isAttending, onToggleAttend }) {
  return (
    <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 15px rgba(0,0,0,0.3)', border: '1px solid #374151' }}>
      {/* Imagen */}
      <div style={{ height: '160px', backgroundColor: '#374151', overflow: 'hidden' }}>
        <img
          src={event.image}
          alt={event.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x160?text=Gaming';
          }}
        />
      </div>

      {/* Contenido */}
      <div style={{ padding: '20px' }}>
        <div style={{ color: '#60a5fa', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
          📅 {new Date(event.date).toLocaleDateString('es-ES')}
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
          {event.title}
        </h3>
        <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>
          📍 {event.location}
        </p>
        <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>
          {event.description}
        </p>
        <button
          onClick={() => onToggleAttend(event.id)}
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
            backgroundColor: isAttending ? '#dc2626' : '#2563eb',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = isAttending ? '#991b1b' : '#1d4ed8';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = isAttending ? '#dc2626' : '#2563eb';
          }}
        >
          {isAttending ? '✓ Asistiendo' : 'Asistir'}
        </button>
      </div>
    </div>
  );
}
