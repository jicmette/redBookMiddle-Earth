const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = 'https://the-one-api.dev/v2/';

// Function to fetch data from The One API
export async function getData(endpoint) {
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
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


