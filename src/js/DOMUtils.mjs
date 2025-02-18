// Populate the dropdown with characters
export function populateDropdown(characters) {
    const dropdown = document.getElementById("characters-label");
    characters.forEach((character) => {
      const option = document.createElement("option");
      option.value = character._id; // Use the character ID as the value
      option.textContent = character.name;
      dropdown.appendChild(option);
    });
  }

   // Display character information
   export function renderCharacterInfo(characterId, characters, raceEmojis, addFavorite) {
    const character = characters.find((char) => char._id === characterId);
    const characterInfoDiv = document.getElementById("character-info");

    if (character) {
      const emoji = raceEmojis[character.race] || "❓"; // Default emoji if race not found
      characterInfoDiv.innerHTML = `
        <h3>${character.name} ${emoji}</h3>
        <p><strong>Race:</strong> ${character.race}</p>
        <p><strong>Gender:</strong> ${character.gender}</p>
        <p><strong>Birth:</strong> ${character.birth}</p>
        <p><strong>Death:</strong> ${character.death}</p>
        <p><strong>Realm:</strong> ${character.realm || "Unknown"}</p>
        <p><strong>Spouse:</strong> ${character.spouse || "Unknown"}</p>
        <button id="favorite-btn" data-id="${character._id}">Add to Favorites</button>`;

      // Add event listener to the "Add to Favorites" button
      document.getElementById("favorite-btn").addEventListener("click", () => {
        addFavorite(character);
      });
    } else {
      characterInfoDiv.innerHTML = ""; // Clear the info if no character is found
    }
  }

// Display the list of favorite characters

  export function displayFavorites(favorites, removeFavorite) {
    const favoritesDiv = document.getElementById("favorites-list");
    favoritesDiv.innerHTML = "<h3>Favorites ⭐</h3>";

    if (favorites.length > 0) {
      favorites.forEach((character) => {
        const favoriteItem = document.createElement("div");
        favoriteItem.className = "favorite-item";
        favoriteItem.innerHTML = `
          <p><strong>${character.name}</strong> (${character.race})</p>
          <button data-id="${character._id}" class="remove-btn">Remove</button>
        `;

        // Add event listener to the "Remove" button
        favoriteItem.querySelector(".remove-btn").addEventListener("click", (event) => {
            const characterId = event.target.getAttribute("data-id");
            removeFavorite(characterId);
          });

        favoritesDiv.appendChild(favoriteItem);
      });
    } else {
      favoritesDiv.innerHTML += "<p>No favorites yet.</p>";
    }
  }

  // Set up event listeners
  export function setupEventListeners(renderCharacterInfo, characters, raceEmojis, addFavorite) {
    document.getElementById("characters-label").addEventListener("change", (event) => {
        const characterId = event.target.value;
        if (characterId) {
          renderCharacterInfo(characterId, characters, raceEmojis, addFavorite);
        } else {
          document.getElementById("character-info").innerHTML = ""; // Clear the info
        }
      });
  }