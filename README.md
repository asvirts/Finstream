# FinStream

FinStream is a mobile-first finance management application built with Expo and React Native. It provides small businesses and freelancers with a seamless way to track accounts, transactions, invoices, receipts, and generate reports—all from a unified interface. Deployable on iOS, Android, and Web, FinStream delivers a consistent, high-performance experience across platforms.

## Features

- **Accounts Dashboard**: View and manage multiple bank accounts in one place.
- **Real-Time Transactions**: Fetch and categorize transactions automatically.
- **Invoices & Billing**: Create, send, and track invoices with built‑in templates.
- **Receipt Capture**: Snap photos of receipts, extract data, and attach them to expenses.
- **Reporting**: Generate custom financial reports for analysis and tax prep.
- **Cross-Platform**: Native iOS & Android apps plus a responsive web build.
- **Offline Support**: Cached data and offline data entry, synchronizing when you’re back online.

## Tech Stack

- **Framework**: [Expo SDK](https://expo.dev/) & [Expo Router](https://expo.github.io/router/)
- **Language**: TypeScript
- **UI**: React Native with Context API (Reducers) for state management
- **Navigation**: React Navigation (stack & tab navigators)
- **Services**: REST API integration via Axios in a service-layer pattern
- **Testing**: Jest & React Native Testing Library
- **Styling**: PostCSS & custom theming utilities
- **Deployment**:
  - Mobile: Expo Go or standalone builds via `eas build`
  - Web: Static export via Expo/Web, hosted on Vercel

## Folder Structure

```plain
├── app/               # Expo Router entrypoints & layouts
├── assets/            # Images, fonts, and splash assets
├── components/        # Shared UI components & tests
├── constants/         # Color palettes & design tokens
├── hooks/             # Custom React hooks for theme & utilities
├── src/
│   ├── context/       # AppContext & reducer logic
│   ├── navigation/    # Route definitions & navigation types
│   ├── screens/       # Feature screens by domain
│   └── services/      # API methods & storage helpers
├── scripts/           # Utility scripts (e.g., reset-project)
├── postcss.config.mjs # PostCSS configuration
├── tsconfig.json      # TypeScript compiler options
├── package.json       # Dependencies & npm scripts
└── vercel.json        # Web deployment configuration
```

## Getting Started

### Prerequisites

- Node.js (>= 16.x)
- Yarn or npm
- Expo CLI (`npm install -g expo-cli`)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/finstream.git
cd finstream

# Install dependencies
yarn install   # or npm install

# Start the development server
expo start
```

- Press `i` to open an iOS simulator, `a` for Android, or scan the QR code with Expo Go.
- Launch the web version with `expo start --web`.

## Testing

```bash
yarn test   # or npm test
```

## Building & Deployment

- **Mobile**: Use `eas build --platform ios` or `eas build --platform android`.
- **Web**: Deploy the static output in `web-build/` to Vercel or any static host.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for bug fixes and new features.

## License

MIT © 2025 Andrew Virts
