import axios from 'axios';
import type { Movie, TMDBGenre, TMDBMovie } from '../domain/MovieBase';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

async function getGenres() {
    const res = await axios.get(
        'https://api.themoviedb.org/3/genre/movie/list',
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        }
    );

    const data = res.data;

    return data.genres as TMDBGenre[];
}

export async function addMovie(movie: {
    name: string;
    year: number;
}) {
    console.log('Отправляем фильм:', movie);

    return movie;
}

export async function searchMovies(query: string): Promise<Movie[]> {
    const genres = await getGenres();

    const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=ru-RU`,
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        }
    );

    const data = res.data;

    const tmdbMovies = data.results as TMDBMovie[];

    return tmdbMovies.map(movie => ({
        id: movie.id,
        name: movie.title,
        year: Number(movie.release_date?.slice(0, 4)) || 0,
        type: 'movie',

        rating: {
            tmdb: movie.vote_average
        },

        genres: (movie.genre_ids || []).map(genreId => {
            const genre = genres.find(genre => genre.id === genreId);

            return {
                id: genreId,
                name: genre?.name || 'Неизвестно'
            };
        }),

        poster: {
            url: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : ''
        },

        description: movie.overview
    }));
}

export async function getMovies(): Promise<Movie[]> {
    const genres = await getGenres();

    const page = Math.floor(Math.random() * 500) + 1;

    const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?page=${page}`,
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        }
    );

    const data = res.data;

    const tmdbMovies = data.results as TMDBMovie[];

    const randomMovies = [...tmdbMovies]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

    return randomMovies.map(movie => ({
        id: movie.id,
        name: movie.title,
        year: Number(movie.release_date?.slice(0, 4)) || 0,
        type: 'movie',

        rating: {
            tmdb: movie.vote_average
        },

        genres: movie.genre_ids.map(genreId => {
            const genre = genres.find(genre => genre.id === genreId);

            return {
                id: genreId,
                name: genre?.name || 'Неизвестно'
            };
        }),

        poster: {
            url: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : ''
        },

        description: movie.overview
    }));


}