export default function EventCard({ event, isAttending, onToggleAttend }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Imagen del evento */}
      <div className="relative h-48 overflow-hidden bg-gray-700">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Fecha */}
        <div className="text-sm text-blue-400 mb-2">
          📅 {new Date(event.date).toLocaleDateString('es-ES')}
        </div>

        {/* Título */}
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Ubicación */}
        <div className="text-sm text-gray-400 mb-3">
          📍 {event.location}
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Botón de asistencia */}
        <button
          onClick={() => onToggleAttend(event.id)}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
            isAttending
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isAttending ? 'Cancelar asistencia' : 'Asistir'}
        </button>
      </div>
    </div>
  );
}
