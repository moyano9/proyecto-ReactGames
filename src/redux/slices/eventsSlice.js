import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEvents } from '../../data/events';

export const fetchEventsThunk = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchEvents();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  events: [],
  attendingEvents: [],
  loading: false,
  error: null,
};

// Cargar eventos a los que asiste desde localStorage
const loadAttendingEventsFromStorage = () => {
  try {
    const stored = localStorage.getItem('attendingEvents');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading attending events from storage:', error);
    return [];
  }
};

// Guardar eventos en localStorage
const saveAttendingEventsToStorage = (events) => {
  try {
    localStorage.setItem('attendingEvents', JSON.stringify(events));
  } catch (error) {
    console.error('Error saving attending events to storage:', error);
  }
};

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    ...initialState,
    attendingEvents: loadAttendingEventsFromStorage(),
  },
  reducers: {
    toggleAttendEvent(state, action) {
      const eventId = action.payload;
      const index = state.attendingEvents.indexOf(eventId);
      
      if (index > -1) {
        state.attendingEvents.splice(index, 1);
      } else {
        state.attendingEvents.push(eventId);
      }
      
      saveAttendingEventsToStorage(state.attendingEvents);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEventsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleAttendEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
