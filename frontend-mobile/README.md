# wat2do Mobile App

Mobile application for browsing University of Waterloo club events, built with React Native and Expo.

## Features

- Browse upcoming events with infinite scroll
- Search events by keyword
- Filter events by category
- View event details including location, price, and time
- iOS-style bottom navigation
- Matches the design of the web frontend

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for bottom tab navigation
- **TanStack Query** for data fetching and caching
- **Axios** for API calls

## Prerequisites

- Node.js 18+ and npm
- Expo Go app on your mobile device (for testing)
- iOS Simulator or Android Emulator (optional)

## Setup

1. Navigate to the frontend-mobile directory:
```bash
cd frontend-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment (optional):
The API URL is configured in `app.json` under `extra.apiUrl`. The default is set to the production API at `https://api.wat2do.ca/api`.

## Running the App

### Development Mode

Start the Expo development server:
```bash
npm start
```

This will open the Expo developer tools in your browser. From there, you can:

- Scan the QR code with the Expo Go app on your phone (iOS/Android)
- Press `i` to open in iOS Simulator
- Press `a` to open in Android Emulator
- Press `w` to open in web browser

### Platform-Specific Commands

```bash
npm run ios      # Run on iOS simulator
npm run android  # Run on Android emulator
npm run web      # Run in web browser
```

## Project Structure

```
frontend-mobile/
├── src/
│   ├── api/              # API client
│   │   └── client.ts     # Events API integration
│   ├── components/       # Reusable components
│   │   ├── CategoryFilters.tsx
│   │   ├── EventCard.tsx
│   │   └── SearchBar.tsx
│   ├── constants/        # App constants
│   │   └── events.ts     # Event categories and emojis
│   ├── hooks/            # Custom React hooks
│   │   └── useEvents.ts  # Events data fetching hook
│   ├── navigation/       # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── screens/          # Screen components
│   │   └── EventsScreen.tsx
│   └── types/            # TypeScript types
│       └── event.ts      # Event type definitions
├── App.tsx               # Root component
├── app.json              # Expo configuration
└── package.json          # Dependencies
```

## API Integration

The app connects to the same Django REST API backend as the web frontend. Key endpoints used:

- `GET /api/events/` - Fetch events with cursor-based pagination
  - Supports query parameters: `search`, `categories`, `cursor`
  - Returns: `{ results, nextCursor, hasMore, totalCount }`

API documentation is available in `API_ROUTES.md`.

## Current Implementation

### Completed Features
- Events browsing with infinite scroll
- Search functionality
- Category filters
- Event cards with images, location, price, and dates
- Bottom tab navigation structure
- Loading states and error handling

### Placeholder Tabs
The following tabs are set up but show "Coming soon":
- Clubs
- Saved Events
- Profile

## Design Notes

The mobile app design matches the web frontend:
- Similar color scheme (grays, blacks, greens)
- Same event categories and emoji icons
- Consistent card styling
- Familiar filter interactions

## Development

### Adding New Features

1. **New Screens**: Add to `src/screens/`
2. **New Components**: Add to `src/components/`
3. **API Methods**: Extend `src/api/client.ts`
4. **New Hooks**: Add to `src/hooks/`

### Styling

The app uses React Native StyleSheet for styling. Colors and common styles should be kept consistent with the web frontend where possible.

### Testing

Test the app on both iOS and Android devices/simulators to ensure consistent behavior across platforms.

## Troubleshooting

### API Connection Issues

If you're having trouble connecting to the API:

1. Check that the API URL in `app.json` is correct
2. Ensure your device/simulator has internet access
3. Check the Expo console for error messages

### Build Errors

If you encounter build errors:

1. Clear the Metro bundler cache: `npx expo start -c`
2. Delete node_modules and reinstall: `rm -rf node_modules && npm install`
3. Check that all dependencies are compatible with your Expo SDK version

## Next Steps

Future enhancements could include:
- Event detail view
- Saved/interested events functionality
- Calendar integration
- Push notifications for new events
- Clubs directory
- User profile and authentication
- Dark mode support

## Contributing

When making changes to the mobile app:
1. Follow the existing code structure
2. Match the web frontend design patterns
3. Test on both iOS and Android
4. Update this README if adding new features
