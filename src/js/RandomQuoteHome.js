import { getData } from './ExternalServices.mjs';

// Function to fetch character name by ID
async function getCharacterName(characterId) {
    const data = await getData(`character/${characterId}`);
    if (data && data.docs && data.docs.length > 0) {
        return data.docs[0].name;
    }
    return 'Unknown Character';
}

// Fetch and display a random quote
export async function fetchQuote() {
    const data = await getData('quote');

    if (data && data.docs) {
        const randomQuote = data.docs[Math.floor(Math.random() * data.docs.length)];

        // Fetch character name
        const characterName = await getCharacterName(randomQuote.character);
        const quoteElement = document.getElementById('daily-quote');
        quoteElement.innerHTML = `"${randomQuote.dialog}"`;
        const characterElement = document.getElementById('quote-character');
        characterElement.innerHTML = `- ${characterName}`;
    } else {
        console.error('Data format is not as expected:', data);
    }
}