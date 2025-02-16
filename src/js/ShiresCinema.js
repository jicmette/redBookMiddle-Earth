import { getData } from './ExternalServices.mjs';

document.addEventListener('DOMContentLoaded', async () => {
    const shiresContainer = document.querySelector('.shires-container');

    try {
        const data = await getData('movie');
        console.log(data);
        renderMovies(data.docs);
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    function renderMovies(movies) {
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
            <h3>${movie.name}</h3>
            <img src="/images/${movie.name}.webp" alt="${movie.name}">
            <p><b>Runtime:</b> ${movie.runtimeInMinutes} minutes</p>
            <p><b>Budget:</b> $${movie.budgetInMillions} million</p>
            <p><b>Box Office Revenue:</b> $${movie.boxOfficeRevenueInMillions} million</p>
            <p><b>Academy Award Nominations:</b> ${movie.academyAwardNominations}</p>
            <p><b>Academy Award Wins:</b> ${movie.academyAwardWins}</p>
            <p><b>Rotten Tomatoes Score:</b> ${movie.rottenTomatoesScore}%</p>
            `;
            shiresContainer.appendChild(movieElement);
        });
    }
});
