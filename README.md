# 🍹 D'Bar Cocktail App

A React Native app for discovering, saving, and creating custom cocktail recipes. Users can view drinks from an external API, favorite drinks, create their own using a form, and store them locally using AsyncStorage.

## 📱 Features

- **Browse Cocktails** from [TheCocktailDB API](https://www.thecocktaildb.com/api.php)
- **Favorite Drinks** for quick access
- **Create Your Own Drink** using a dynamic form
- **Add Custom Ingredients & Instructions**
- **Image Upload** for custom drinks using device library
- **Save Locally** using React Native `AsyncStorage`
- **Filter Favorites** to hide alcoholic drinks
- **Load Static Drinks** on app startup
- **Delete or Clear Custom Drinks** with confirmation prompts

---

## 🚀 How the App Works

### Home Tab
- Displays drinks from [TheCocktailDB](https://www.thecocktaildb.com).
- Users can tap a drink for details and tap a heart icon to favorite it.

### Favorites Tab
- Lists all favorited drinks.
- Includes a toggle to hide alcoholic drinks.
- If no favorites exist, a prompt appears.

### My Drinks Tab
- Displays static drinks from a local file (`StaticDrinks.js`) and any custom drinks created using the form.
- Users can:
  - View drink details
  - Add a new drink via a `+` button
  - Clear all saved custom drinks

### Drink Details
- Shows a drink's image, ingredients, instructions, and metadata (category, glass, type).
- A heart icon allows toggling the favorite status.

### Add Drink Form
- Built with `react-hook-form`
- Inputs:
  - Drink name
  - Category (fetched from API)
  - Glass type (fetched from API)
  - Alcohol content (radio)
  - Image picker (optional)
  - Dynamic fields for ingredients and instructions
- Validation for all fields, including at least one ingredient and instruction

---

## 🧪 Tech Stack

- **React Native** (via Expo)
- **React Navigation** for screen routing
- **React Hook Form** for form handling
- **AsyncStorage** for local persistence
- **Expo Image Picker** for image selection
- **RNE UI (`@rneui/themed`)** for UI components

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cocktail-companion.git
   cd cocktail-companion
2.npm install
3.npx expo start
