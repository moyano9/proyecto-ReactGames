// Tu API key personal
const API_KEY = '2021edb6e4674ea2936397cb7a1a4af3';
const BASE_URL = 'https://api.rawg.io/api';

// Obtener juegos populares para el carrusel
export const getPopularGames = async () => {
  try {
    // Juegos más jugados en el mundo (mejor métrica de popularidad)
    const url = `${BASE_URL}/games?key=${API_KEY}&ordering=-playtime&page_size=10`;
    console.log('Fetching popular games...');
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return [];
    }
    
    const data = await response.json();
    console.log('Popular games loaded:', data.results?.length || 0, 'games');
    return data.results || [];
  } catch (error) {
    console.error('Error fetching popular games:', error);
    return [];
  }
};

// Obtener todos los juegos con paginación
export const getAllGames = async (page = 1) => {
  try {
    const url = `${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=20&ordering=-rating`;
    console.log('Fetching all games, page:', page);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return { results: [], next: null, count: 0 };
    }
    
    const data = await response.json();
    console.log('Games loaded:', data.results?.length || 0, 'games');
    return {
      results: data.results || [],
      next: data.next,
      count: data.count
    };
  } catch (error) {
    console.error('Error fetching all games:', error);
    return { results: [], next: null, count: 0 };
  }
};

// Buscar juegos por nombre
export const searchGames = async (query, page = 1) => {
  try {
    const url = `${BASE_URL}/games?key=${API_KEY}&search=${query}&page=${page}&page_size=20`;
    console.log('Searching for:', query);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return { results: [], next: null, count: 0 };
    }
    
    const data = await response.json();
    console.log('Search results:', data.results?.length || 0, 'games');
    return {
      results: data.results || [],
      next: data.next,
      count: data.count
    };
  } catch (error) {
    console.error('Error searching games:', error);
    return { results: [], next: null, count: 0 };
  }
};

// Obtener detalles de un juego específico
export const getGameDetails = async (id) => {
  try {
    const url = `${BASE_URL}/games/${id}?key=${API_KEY}`;
    console.log('Fetching game details for ID:', id);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return null;
    }
    
    const data = await response.json();
    console.log('Game loaded:', data.name);
    return data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    return null;
  }
};

// Obtener juegos por tag/género con paginación
export const getGamesByTag = async (tagId, page = 1) => {
  try {
    const url = `${BASE_URL}/games?key=${API_KEY}&tags=${tagId}&page=${page}&page_size=20&ordering=-rating`;
    console.log('Fetching games for tag:', tagId, 'page:', page);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return { results: [], next: null, count: 0 };
    }
    
    const data = await response.json();
    console.log('Games by tag loaded:', data.results?.length || 0, 'games');
    return {
      results: data.results || [],
      next: data.next,
      count: data.count
    };
  } catch (error) {
    console.error('Error fetching games by tag:', error);
    return { results: [], next: null, count: 0 };
  }
};

// Obtener detalles de un tag
export const getTagDetails = async (tagId) => {
  try {
    const url = `${BASE_URL}/tags/${tagId}?key=${API_KEY}`;
    console.log('Fetching tag details for ID:', tagId);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return null;
    }
    
    const data = await response.json();
    console.log('Tag loaded:', data.name);
    return data;
  } catch (error) {
    console.error('Error fetching tag details:', error);
    return null;
  }
};

// Obtener publishers con paginación
export const getPublishers = async (page = 1) => {
  try {
    const url = `${BASE_URL}/publishers?key=${API_KEY}&page=${page}&page_size=20&ordering=-games_count`;
    console.log('Fetching publishers, page:', page);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return { results: [], next: null, count: 0 };
    }
    
    const data = await response.json();
    console.log('Publishers loaded:', data.results?.length || 0, 'publishers');
    return {
      results: data.results || [],
      next: data.next,
      count: data.count
    };
  } catch (error) {
    console.error('Error fetching publishers:', error);
    return { results: [], next: null, count: 0 };
  }
};

// Buscar publishers por nombre
export const searchPublishers = async (query, page = 1) => {
  try {
    const url = `${BASE_URL}/publishers?key=${API_KEY}&search=${query}&page=${page}&page_size=20`;
    console.log('Searching for publishers:', query);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return { results: [], next: null, count: 0 };
    }
    
    const data = await response.json();
    console.log('Search results:', data.results?.length || 0, 'publishers');
    return {
      results: data.results || [],
      next: data.next,
      count: data.count
    };
  } catch (error) {
    console.error('Error searching publishers:', error);
    return { results: [], next: null, count: 0 };
  }
};

// Obtener detalles de un publisher
export const getPublisherDetails = async (publisher_id) => {
  try {
    const url = `${BASE_URL}/publishers/${publisher_id}?key=${API_KEY}`;
    console.log('Fetching publisher details for ID:', publisher_id);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return null;
    }
    
    const data = await response.json();
    console.log('Publisher loaded:', data.name);
    return data;
  } catch (error) {
    console.error('Error fetching publisher details:', error);
    return null;
  }
};

// Obtener juegos de un publisher específico con paginación
export const getGamesByPublisher = async (publisher_id, page = 1) => {
  try {
    const url = `${BASE_URL}/games?key=${API_KEY}&publishers=${publisher_id}&page=${page}&page_size=20&ordering=-rating`;
    console.log('Fetching games for publisher:', publisher_id, 'page:', page);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return { results: [], next: null, count: 0 };
    }
    
    const data = await response.json();
    console.log('Games by publisher loaded:', data.results?.length || 0, 'games');
    return {
      results: data.results || [],
      next: data.next,
      count: data.count
    };
  } catch (error) {
    console.error('Error fetching games by publisher:', error);
    return { results: [], next: null, count: 0 };
  }
};
