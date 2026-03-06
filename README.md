# SkyCast | Weather Dashboard project

SkyCast is a modern web application for tracking weather, built on Next.js and Redux Toolkit. The project combines high performance of server components with interactive client interfaces.

**Demo:** [SkyCast | Weather Dashboard](https://weather-and-city-dashboard.vercel.app/)

## ✨ Features

- **Current weather and forecast:** Detailed data on temperature, humidity, and wind speed, as well as a 5-day forecast.
- **Smart search:** Search for weather by city name.
- **Favorites:** Ability to save cities for quick access with synchronization via Redux.
- **Responsive design:** The interface is fully optimized for devices ranging from 320px to desktops.
- **Dynamic themes:** Support for light and dark themes using CSS variables and SCSS.
- **Notifications:** Interactive toasts via react-toastify to confirm user actions.

## 🚀 Technology stack

- Framework: [Next.js](https://nextjs.org/) (App Router)
- State Management: [Redux Toolkit](https://redux-toolkit.js.org/) + Redux Persist
- Styling: SCSS Modules, CSS Variables
- Icons: [Lucide-React](https://lucide.dev/)
- API: [OpenWeatherMap API](https://openweathermap.org/api)

## 🛠️ Project architecture

The project follows recommendations for separating responsibilities:

- **Server Components:** Used for pages (page.tsx) and basic markup, which ensures excellent SEO and fast metadata loading.
- **Client Components:** Separated into individual modules (e.g., FavoritesList, HomeContent) for state management and interactivity.
- **Theme Management:** Isolated theme management logic via ThemeManager, independent of other UI components.

## 📦 Installation and launch

1. Clone the repository:

`https://github.com/AARON-FOX/weather-and-city-dashboard.git`

2. Install dependencies:

`npm install`

3. Set up environment variables:

`NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here`

4. Start the development server:

`npm run dev`
