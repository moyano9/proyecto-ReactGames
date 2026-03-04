import { useDispatch, useSelector } from 'react-redux';
import { toggleAttendEvent } from '../redux/slices/eventsSlice';
import EventCard from '../components/EventCard';

export default function MyEvents() {
  const dispatch = useDispatch();
  const { events, attendingEvents } = useSelector((state) => state.events);

  const myEvents = events.filter((event) => attendingEvents.includes(event.id));

  const handleToggleAttend = (eventId) => {
    dispatch(toggleAttendEvent(eventId));
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Mis Eventos</h1>
          <p className="text-gray-400">
            Eventos a los que estoy inscrito ({myEvents.length})
          </p>
        </div>

        {myEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">
              No te has inscrito a ningún evento aún
            </p>
            <a
              href="/events"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Ver todos los eventos
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isAttending={true}
                onToggleAttend={handleToggleAttend}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
