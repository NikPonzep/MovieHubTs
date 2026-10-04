import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { Movie } from '../../domain/MovieBase';

import MovieList from '../../components/MovieList/MovieList';
import { getMovies, searchMovies } from '../../services/movieService';

import styles from './Movies.module.css';
import { Search } from 'lucide-react';

interface MoviesProps {
    onAdd: (movie: Movie) => void;
}

function Movies({ onAdd }: MoviesProps) {
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');

    const {
        data: movies = [],
        isLoading,
        isError
    } = useQuery({
        queryKey: ['movies', query],
        queryFn: () => {
            if (query) {
                return searchMovies(query);
            }

            return getMovies();
        },
        staleTime: 1000 * 60 * 5
    });

    function handleSearch() {
        setQuery(search.trim());
    }

    return (
        <section className={styles.moviesPage}>
            <h2 className={styles.title}>Фильмы</h2>

            <form
                className={styles.search}
                onSubmit={event => {
                    event.preventDefault();
                    handleSearch();
                }}
            >
                <input
                    type="text"
                    placeholder="Введите название фильма..."
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                />

                <button type="submit">
                    <Search size={18} />
                    Найти
                </button>
            </form>

            {isLoading ? (
                <p>Загрузка фильмов...</p>
            ) : isError ? (
                <p>Ошибка загрузки фильмов</p>
            ) : movies.length === 0 ? (
                <p>Фильмы не найдены</p>
            ) : (
                <MovieList
                    movies={movies}
                    onAdd={onAdd}
                />
            )}
        </section>
    );
}

export default Movies;