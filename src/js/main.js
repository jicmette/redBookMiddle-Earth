const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = 'https://the-one-api.dev/v2';

// Function to fetch data from The One API
async function getData(endpoint) {
    try {
        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(getData('/movie'));
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


// Function to fetch character name by ID
async function getCharacterName(characterId) {
    const data = await getData(`/character/${characterId}`);
    if (data && data.docs && data.docs.length > 0) {
        return data.docs[0].name;
    }
    return 'Unknown Character';
}

// Fetch and display a random quote
async function fetchQuote() {
    const data = await getData('/quote');

    if (data && data.docs) {
        const randomQuote = data.docs[Math.floor(Math.random() * data.docs.length)];
        console.log('Random Quote:', randomQuote);

        // Fetch character name
        const characterName = await getCharacterName(randomQuote.character);
        console.log('Character Name:', characterName);

        const quoteElement = document.getElementById('daily-quote');
        quoteElement.innerHTML = `"${randomQuote.dialog}"`;
        const characterElement = document.getElementById('quote-character');
        characterElement.innerHTML = `- ${characterName}`;
    } else {
        console.error('Data format is not as expected:', data);
    }
}

// Fetch a quote when the page loads
window.onload = fetchQuote;



