import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsThunk, toggleAttendEvent } from '../redux/slices/eventsSlice';
import EventCard from '../components/EventCard';

export default function Events() {
  const dispatch = useDispatch();
  const { events, attendingEvents, loading, error } = useSelector(
    (state) => state.events
  );

  useEffect(() => {
    dispatch(fetchEventsThunk());
  }, [dispatch]);

  const handleToggleAttend = (eventId) => {
    dispatch(toggleAttendEvent(eventId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando eventos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center pt-20">
        <div className="bg-gray-800 p-8 rounded-lg text-center border border-red-600">
          <p className="text-red-500 text-lg">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111827', paddingTop: '120px', paddingBottom: '40px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>🎮 Próximos Eventos</h1>
        <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '16px' }}>Descubre y apúntate a los eventos de videojuegos</p>
        {events.length > 0 && (
          <div style={{ display: 'inline-block', backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold' }}>
            {attendingEvents.length} de {events.length}
          </div>
        )}
      </div>

      {/* Lista de eventos */}
      {events.length === 0 ? (
        <div style={{ textAlign: 'center', paddingTop: '48px' }}>
          <p style={{ color: '#9ca3af' }}>No hay eventos disponibles</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isAttending={attendingEvents.includes(event.id)}
              onToggleAttend={handleToggleAttend}
            />
          ))}
        </div>
      )}
    </div>
  );
}
