export default [
  {
    id: 1,
    name: "Hugo Spritz",
    category: "Mocktail",
    glass: "Wine glass",
    strAlcoholic: "Non alcoholic",
    image: require('../assets/Hugo-Spritz.jpg'),
    ingredients: ["Prosecco", "Elderflower syrup", "Soda water", "Mint leaves", "Lime slices"],
    instructions: [
      "Mix prosecco, elderflower syrup, and soda water",
      "Add mint leaves and lime slices",
      "Serve over ice"
    ]
  },
  {
    id: 2,
    name: "Parmesan Espresso Martini",
    category: "Cocktail",
    glass: "Cocktail glass",
    strAlcoholic: "Alcoholic",
    image: require('../assets/Parmesan_Espresso_Martini.jpg'),
    ingredients: ["Vodka", "Coffee liqueur", "Espresso", "Parmesan cheese", "Sugar", "Bitters"],
    instructions:[ "Shake vodka coffee liqueur, and espresso with ice","Strain into a cocktail glass","Garnish with grated Parmesan cheese and a dash of bitters"]
  },
  {
    id: 3,
    name: "White Russian Tiramisu",
    category: "Cocktail",
    glass: "Highball glass",
    strAlcoholic: "Alcoholic",
    image: require('../assets/tiramisu-white-russian.jpg'),
    ingredients: ["Vodka", "Coffee liqueur", "Heavy cream", "Tiramisu mix", "Cocoa powder"],
    instructions: ["Mix vodka, coffee liqueur, and heavy cream","Add tiramisu mix and stir gently","Serve over ice in a highball glass","Dust with cocoa powder on top"]
  }
];