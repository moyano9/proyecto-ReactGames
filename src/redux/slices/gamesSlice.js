import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiService from '../../services/api';

// Thunks para obtener datos globales
export const fetchPopularGames = createAsyncThunk(
  'games/fetchPopularGames',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiService.getPopularGames();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllGames = createAsyncThunk(
  'games/fetchAllGames',
  async (page = 1, { rejectWithValue }) => {
    try {
      const data = await apiService.getAllGames(page);
      return { ...data, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchGamesThunk = createAsyncThunk(
  'games/searchGames',
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      const data = await apiService.searchGames(query, page);
      return { ...data, page, query };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGameDetails = createAsyncThunk(
  'games/fetchGameDetails',
  async (id, { rejectWithValue }) => {
    try {
      const data = await apiService.getGameDetails(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGamesByTag = createAsyncThunk(
  'games/fetchGamesByTag',
  async ({ tagId, page = 1 }, { rejectWithValue }) => {
    try {
      const data = await apiService.getGamesByTag(tagId, page);
      return { ...data, page, tagId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTagDetails = createAsyncThunk(
  'games/fetchTagDetails',
  async (tagId, { rejectWithValue }) => {
    try {
      const data = await apiService.getTagDetails(tagId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPublishers = createAsyncThunk(
  'games/fetchPublishers',
  async (page = 1, { rejectWithValue }) => {
    try {
      const data = await apiService.getPublishers(page);
      return { ...data, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchPublishersThunk = createAsyncThunk(
  'games/searchPublishers',
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      const data = await apiService.searchPublishers(query, page);
      return { ...data, page, query };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPublisherDetails = createAsyncThunk(
  'games/fetchPublisherDetails',
  async (publisherId, { rejectWithValue }) => {
    try {
      const data = await apiService.getPublisherDetails(publisherId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGamesByPublisher = createAsyncThunk(
  'games/fetchGamesByPublisher',
  async ({ publisherId, page = 1 }, { rejectWithValue }) => {
    try {
      const data = await apiService.getGamesByPublisher(publisherId, page);
      return { ...data, page, publisherId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  popularGames: [],
  allGames: [],
  currentGame: null,
  gamesByTag: [],
  gamesByPublisher: [],
  tagDetails: null,
  publisherDetails: null,
  publishers: [],
  currentPage: 1,
  currentSearchQuery: '',
  currentTagId: null,
  currentPublisherId: null,
  loading: false,
  error: null,
  favorites: [],
};

// Cargar favoritos desde localStorage
const loadFavoritesFromStorage = () => {
  try {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading favorites from storage:', error);
    return [];
  }
};

// Guardar favoritos en localStorage
const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to storage:', error);
  }
};

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    ...initialState,
    favorites: loadFavoritesFromStorage(),
  },
  reducers: {
    toggleFavorite(state, action) {
      const gameId = action.payload;
      const index = state.favorites.indexOf(gameId);
      
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(gameId);
      }
      
      saveFavoritesToStorage(state.favorites);
    },
    isFavoritedGame(state, action) {
      return state.favorites.includes(action.payload);
    },
  },
  extraReducers: (builder) => {
    // Juegos populares
    builder
      .addCase(fetchPopularGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularGames.fulfilled, (state, action) => {
        state.loading = false;
        state.popularGames = action.payload;
      })
      .addCase(fetchPopularGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Todos los juegos
    builder
      .addCase(fetchAllGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllGames.fulfilled, (state, action) => {
        state.loading = false;
        state.allGames = action.payload.results;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchAllGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Búsqueda de juegos
    builder
      .addCase(searchGamesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchGamesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.allGames = action.payload.results;
        state.currentPage = action.payload.page;
        state.currentSearchQuery = action.payload.query;
      })
      .addCase(searchGamesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Detalles del juego
    builder
      .addCase(fetchGameDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGame = action.payload;
      })
      .addCase(fetchGameDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Juegos por tag
    builder
      .addCase(fetchGamesByTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGamesByTag.fulfilled, (state, action) => {
        state.loading = false;
        state.gamesByTag = action.payload.results;
        state.currentPage = action.payload.page;
        state.currentTagId = action.payload.tagId;
      })
      .addCase(fetchGamesByTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Detalles del tag
    builder
      .addCase(fetchTagDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTagDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.tagDetails = action.payload;
      })
      .addCase(fetchTagDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Publishers
    builder
      .addCase(fetchPublishers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublishers.fulfilled, (state, action) => {
        state.loading = false;
        state.publishers = action.payload.results;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchPublishers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Búsqueda de publishers
    builder
      .addCase(searchPublishersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPublishersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.publishers = action.payload.results;
        state.currentPage = action.payload.page;
        state.currentSearchQuery = action.payload.query;
      })
      .addCase(searchPublishersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Detalles del publisher
    builder
      .addCase(fetchPublisherDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublisherDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.publisherDetails = action.payload;
      })
      .addCase(fetchPublisherDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Juegos por publisher
    builder
      .addCase(fetchGamesByPublisher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGamesByPublisher.fulfilled, (state, action) => {
        state.loading = false;
        state.gamesByPublisher = action.payload.results;
        state.currentPage = action.payload.page;
        state.currentPublisherId = action.payload.publisherId;
      })
      .addCase(fetchGamesByPublisher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleFavorite, isFavoritedGame } = gamesSlice.actions;
export default gamesSlice.reducer;
