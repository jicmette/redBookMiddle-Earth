import { getData } from "./ExternalServices.mjs";
import { saveFavorites, loadFavorites } from "./StorageUtils.mjs";
import { populateDropdown, renderCharacterInfo, displayFavorites, setupEventListeners} from "./DOMUtils.mjs";

class LotRCharacters {
  constructor() {
    this.characters = []; // Store fetched characters
    this.favorites = loadFavorites(); // Load favorites from localStorage
    this.raceEmojis = this.getRaceEmojis();  // Set emojis related to the race of the character
    this.init();
  }

  getRaceEmojis() {
    return {
      "Elf": "🧝",
      "Half-elven": "🧝",
      "Elves": "🧝",
      "Human": "🧑🏻",
      "Men": "🧑🏻",
      "Dwarf": "🧔🏻",
      "Dwarves": "🧔🏻",
      "Hobbit": "🧑‍🌾",
      "Orc": "👹",
      "Orcs": "👹",
      "Black Uruk": "👹",
      "Uruk-hai": "👹",
      "Eagle": "🦅",
      "Great Eagles": "🦅",
      "Ent": "🌲",
      "Dragon": "🐉",
      "Dragons": "🐉",
      "God": "🌟",
      "Ainur": "🌟",
      "Maiar": "🧙‍♂️",
      "Great Spiders": "🕷️",
      "Raven": "🐦‍⬛",
      "Wolfhound": "🐺",
      "Werewolves": "🐺",
      "Men,Wraith": "🗡️",
      "Vampire": "🧛"
    };

  }

  // Initialize the class
  async init() {
    await this.fetchCharacters();
    populateDropdown(this.characters);
    setupEventListeners(this.displayCharacterInfo.bind(this), this.raceEmojis, this.addFavorite.bind(this));
    displayFavorites(this.favorites, this.removeFavorite.bind(this));
  }

  // Fetch characters from The One API
  async fetchCharacters() {
    try {
      const data = await getData("character");
      this.characters = data.docs; // Store characters in the class property
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  }

  // Display character information
  displayCharacterInfo(characterId) {
    const character = this.characters.find((char) => char._id === characterId);
    renderCharacterInfo(characterId, this.characters, this.raceEmojis, this.addFavorite.bind(this));
  }

  // Add a character to favorites
  addFavorite(character) {
    if (!this.favorites.some((fav) => fav._id === character._id)) {
      this.favorites.push(character);
      saveFavorites(this.favorites); // Save favorites to localStorage
      displayFavorites(this.favorites, this.removeFavorite.bind(this)); // Update the favorites list
    } else {
      alert(`${character.name} is already in favorites!`);
    }
  }

  // Remove a character from favorites
  removeFavorite(characterId) {
    this.favorites = this.favorites.filter((fav) => fav._id !== characterId);
    saveFavorites(this.favorites); // Save favorites to localStorage
    displayFavorites(this.favorites, this.removeFavorite.bind(this)); // Update the favorites list
  }
  
}


//Export the LotRCharacters class
export { LotRCharacters };

// Create an instance of the LotRCharacters class

new LotRCharacters();