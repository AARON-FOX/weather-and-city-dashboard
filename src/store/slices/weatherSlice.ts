import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: [{ description: string; icon: string }];
  wind: { speed: number };
}

interface WeatherState {
  currentWeather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  currentWeather: null,
  isLoading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error('City not found');
    };

    return (await response.json()) as WeatherData;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentWeather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default weatherSlice.reducer;
