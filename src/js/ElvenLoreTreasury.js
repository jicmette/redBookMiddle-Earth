import { getQuotes, getData } from './ExternalServices.mjs';

document.addEventListener('DOMContentLoaded', async () => {
    const characterDropdown = document.getElementById('character-dropdown');
    const characterNameElement = document.getElementById('character-name');
    const quotesListElement = document.getElementById('quotes-list');

    // Fetch and populate the character dropdown
    const characters = await getData('character');
    characters.docs.forEach(character => {
        const option = document.createElement('option');
        option.value = character._id;
        option.textContent = character.name;
        characterDropdown.appendChild(option);
    });

    // Fetch and display quotes when a character is selected
    characterDropdown.addEventListener('change', async () => {
        const characterId = characterDropdown.value;
        if (characterId) {
            const character = characters.docs.find(c => c._id === characterId);
            characterNameElement.textContent = character.name;

            const quotes = await getQuotes(characterId);
            quotesListElement.innerHTML = '';
            quotes.docs.forEach(quote => {
                const quoteElement = document.createElement('li');
                quoteElement.textContent = quote.dialog;
                quotesListElement.appendChild(quoteElement);
            });
        } else {
            characterNameElement.textContent = 'No character selected';
            quotesListElement.innerHTML = ''; 
        }
    });
});
