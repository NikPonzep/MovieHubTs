import type { Movie } from "../../domain/MovieBase";
import MovieCard from "../MovieCard/MovieCard";
import styles from './MovieList.module.css';
import { motion } from "motion/react";

interface MovieListProps {
    movies: Movie[],
    onAdd: (movie: Movie) => void
}

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.5
        }
    }
};

function MovieList({ movies, onAdd }: MovieListProps) {
    return (
        <motion.div
            className={styles.movies}
            variants={container}
            initial="hidden"
            animate="show"
        >
            {movies.map(movie => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onAdd={onAdd}
                />
            ))}
        </motion.div>
    )
}

export default MovieList;