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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error al cargar eventos</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Eventos de Videojuegos</h1>
          <p className="text-gray-400">Descubre los próximos eventos relacionados con videojuegos</p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No hay eventos disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
}
