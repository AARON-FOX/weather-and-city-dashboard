import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: [{ description: string; icon: string }];
  wind: { speed: number };
}

export interface ForecastItem {
  dt: number;
  main: {
    temp_max: number;
    temp_min: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
  dt_txt: string;
}

interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: ForecastItem[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  isLoading: false,
  error: null,
};

export const fetchWeatherAndForecast = createAsyncThunk(
  'weather/fetchAll',
  async (city: string, { rejectWithValue }) => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

      const [weatherRes, forecastRes] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        ),
      ]);

      if (!weatherRes.ok || !forecastRes.ok) {
        throw new Error('City not found');
      }

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      const dailyForecast = forecastData.list.filter((item: ForecastItem) =>
        item.dt_txt.includes('12:00:00')
      );

      return {
        current: weatherData,
        forecast: dailyForecast,
      };
    } catch (err) {
      const error = err as Error;

      return rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherAndForecast.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeatherAndForecast.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentWeather = action.payload.current;
        state.forecast = action.payload.forecast;
      })
      .addCase(fetchWeatherAndForecast.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;

        toast.error((action.payload as string) || 'City not found');
      });
  },
});

export default weatherSlice.reducer;
