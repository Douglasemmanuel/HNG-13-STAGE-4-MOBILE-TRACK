
# Crypto Wallet App

A secure and user-friendly **crypto wallet application** built with **React Native** and **Expo**, enabling users to manage, track, and trade cryptocurrencies seamlessly.

---


## Features

* 🌐 **View Market Coins:** Track live cryptocurrency prices and market data.
* ⭐ **Favorites/Wishlist:** Add coins to your favorites list for quick access.
* 📊 **Charts:** Interactive coin charts for different timeframes (1H, 1D, 1W, 1M, 1Y).
* 💰 **Portfolio Overview:** Track your holdings and balance.
* 🔔 **Price Alerts:** Get notifications on price changes or significant market movements.
* 🌓 **Light/Dark Mode:** Seamless theme support.
* 🔒 **Secure Storage:** Favorites and user data are persisted securely on the device.

## Demo

* **Video Demonstration:**
  Watch the full workflow of the app in action: [Demo Video](https://drive.google.com/file/d/1NuGrfEXTAE4bQObSad9cgltkT0BnqZwZ/view?usp=sharing)

---


---

## Tech Stack

* **Frontend:** React Native, Expo
* **UI Components:** React Native Paper / Custom Themed Components
* **Charts:** Victory Native
* **State Management:** Zustand (with persistence)
* **Navigation:** React Navigation / Expo Router
* **API:** CoinGecko API for market data
* **Storage:** AsyncStorage (via Zustand persist middleware)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Douglasemmanuel/HNG-13-STAGE-4-MOBILE-TRACK.git
cd stage-4-task
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the Expo server:

```bash
npx expo start
```

4. Open the app on your device using the Expo Go app, or run on simulator:

```bash
npx expo run:android
npx expo run:ios
```

---

## Usage

* **Browse Market:** View top coins and their market stats.
* **Select a Coin:** Tap a coin to view details, chart, and price changes.
* **Add to Wishlist:** Tap the “Add to Wishlist” button to favorite a coin.
* **Toggle Favorite:** Favorites can be toggled on/off.

Example of using Zustand store to toggle favorite:

```ts
useFavoriteStore.getState().toggleFavorite(coin.symbol);
```

---

## Folder Structure

```
src/
│
├─ components/      # Reusable components (Buttons, Cards, Themed Text)
├─ screens/         # Screen components (Home, Coin Details, Wallet)
├─ store/           # Zustand stores (marketCoins, selectedCoin, favorites)
├─ constants/       # Colors, themes, API URLs
├─ types/           # TypeScript interfaces & types
└─ utils/           # Helper functions
```

---

## State Management

We use **Zustand** with persistence for handling:

* Market coins
* Selected coin details
* Favorite coins

Example favorite coin store:

```ts
import { useFavoriteStore } from '@/store/favorites_store';

useFavoriteStore.getState().toggleFavorite('bitcoin');
```


## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

