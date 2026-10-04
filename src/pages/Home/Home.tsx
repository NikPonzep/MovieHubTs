import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { Search } from 'lucide-react';
import type {
  Movie,
  Watch,
  TMDBMovie,
  TMDBGenre
} from '../../domain/MovieBase';

import styles from './Home.module.css'

interface HomeProps {
  watch: Watch[];
  onAdd: (movie: Movie) => void;
  onRemove: (watchId: number) => void;
}

function Home({ watch, onAdd, onRemove }: HomeProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>('');
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

  async function getGenres() {
    const res = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list',
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );

    if (!res.ok) {
      throw new Error(`Ошибка ${res.status}`);
    }

    const data = await res.json();

    return data.genres as TMDBGenre[];
  }

  async function getMovies() {
    const genres = await getGenres();

    const page = Math.floor(Math.random() * 500) + 1;

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );

    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }

    const data = await res.json();

    const tmdbMovies = data.results as TMDBMovie[];

    const randomMovies = [...tmdbMovies]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    const movies: Movie[] = randomMovies.map(movie => ({
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

    setMovies(movies);
  }

  useEffect(() => {
    getMovies();
  }, []);

  async function searchMovies() {
    const query = search.trim();

    if (!query) {
      getMovies();
      return;
    }

    const genres = await getGenres();

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=ru-RU`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );

    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }

    const data = await res.json();

    const tmdbMovies = data.results || [];

    const movies: Movie[] = tmdbMovies.map((movie: TMDBMovie) => ({
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

    setMovies(movies);
  }

  return (
    <div className={styles.app}>

      <main>
        <section className={styles.hero}>
          <h2>Добро пожаловать в MovieHub</h2>

          <p>Здесь лучшие фильмы</p>
        </section>

        <section className={styles.search_section}>
          <form
            onSubmit={event => {
              event.preventDefault();
              searchMovies();
            }}
          >
            <input
              type="text"
              placeholder="Поиск фильма..."
              value={search}
              onChange={event => setSearch(event.target.value)}
            />

            <button type="submit">
              <Search size={18} />
              Найти
            </button>
          </form>
        </section>

        <section>
          <h2>Фильмы</h2>

          {movies.length === 0 ? (
            <p>Ничего не найдено</p>
          ) : (
            <MovieList
              movies={movies}
              onAdd={onAdd}
            />
          )}
          
        </section>
      </main>
    </div>
  );

}

export default Home;