import { getData } from "./ExternalServices.mjs";

class LotRCharacters {
  constructor() {
    this.characters = []; // Store fetched characters
    this.favorites = this.loadFavorites(); // Load favorites from localStorage
    this.raceEmojis = {
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
    }; // Set emojis related to the race of the character
    this.init();
  }

  // Initialize the class
  async init() {
    await this.fetchCharacters();
    this.populateDropdown();
    this.setupEventListeners();
    this.displayFavorites(); // Display favorites on page load
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

  // Populate the dropdown with characters
  populateDropdown() {
    const dropdown = document.getElementById("characters-label");
    this.characters.forEach((character) => {
      const option = document.createElement("option");
      option.value = character._id; // Use the character ID as the value
      option.textContent = character.name;
      dropdown.appendChild(option);
    });
  }

  // Display character information
  displayCharacterInfo(characterId) {
    const character = this.characters.find((char) => char._id === characterId);
    const characterInfoDiv = document.getElementById("character-info");

    if (character) {
      const emoji = this.raceEmojis[character.race] || "❓"; // Default emoji if race not found
      characterInfoDiv.innerHTML = `
        <h3>${character.name} ${emoji}</h3>
        <p><strong>Race:</strong> ${character.race}</p>
        <p><strong>Gender:</strong> ${character.gender}</p>
        <p><strong>Birth:</strong> ${character.birth}</p>
        <p><strong>Death:</strong> ${character.death}</p>
        <p><strong>Realm:</strong> ${character.realm || "Unknown"}</p>
        <p><strong>Spouse:</strong> ${character.spouse || "Unknown"}</p>
        <button id="favorite-btn" data-id="${
          character._id
        }">Add to Favorites</button>
      `;

      // Add event listener to the "Add to Favorites" button
      document.getElementById("favorite-btn").addEventListener("click", () => {
        this.addFavorite(character);
      });
    } else {
      characterInfoDiv.innerHTML = ""; // Clear the info if no character is found
    }
  }

  // Add a character to favorites
  addFavorite(character) {
    if (!this.favorites.some((fav) => fav._id === character._id)) {
      this.favorites.push(character);
      this.saveFavorites(); // Save favorites to localStorage
      this.displayFavorites(); // Update the favorites list
      alert(`${character.name} added to favorites!`);
    } else {
      alert(`${character.name} is already in favorites!`);
    }
  }

  // Remove a character from favorites
  removeFavorite(characterId) {
    this.favorites = this.favorites.filter((fav) => fav._id !== characterId);
    this.saveFavorites(); // Save favorites to localStorage
    this.displayFavorites(); // Update the favorites list
  }

  // Save favorites to localStorage
  saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  // Load favorites from localStorage
  loadFavorites() {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  }

  // Display the list of favorite characters
  displayFavorites() {
    const favoritesDiv = document.getElementById("favorites-list");
    favoritesDiv.innerHTML = "<h3>Favorites ⭐</h3>";

    if (this.favorites.length > 0) {
      this.favorites.forEach((character) => {
        const favoriteItem = document.createElement("div");
        favoriteItem.className = "favorite-item";
        favoriteItem.innerHTML = `
          <p><strong>${character.name}</strong> (${character.race})</p>
          <button data-id="${character._id}" class="remove-btn">Remove</button>
        `;

        // Add event listener to the "Remove" button
        favoriteItem.querySelector(".remove-btn").addEventListener("click", (event) => {
            const characterId = event.target.getAttribute("data-id");
            this.removeFavorite(characterId);
          });

        favoritesDiv.appendChild(favoriteItem);
      });
    } else {
      favoritesDiv.innerHTML += "<p>No favorites yet.</p>";
    }
  }

  // Set up event listeners
  setupEventListeners() {
    document.getElementById("characters-label").addEventListener("change", (event) => {
        const characterId = event.target.value;
        if (characterId) {
          this.displayCharacterInfo(characterId);
        } else {
          document.getElementById("character-info").innerHTML = ""; // Clear the info
        }
      });
  }
}

// Create an instance of the LotRCharacters class

new LotRCharacters();