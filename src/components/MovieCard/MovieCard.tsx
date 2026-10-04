import type { Movie } from "../../domain/MovieBase";
import Button from "../Button/Button";
import { motion } from "motion/react";

import styles from "./MovieCard.module.css";

interface MovieCardProps {
    movie: Movie;
    onAdd: (movie: Movie) => void;
}

const item = {
    hidden: {
        opacity: 0,
        y: 30
    },
    show: {
        opacity: 1,
        y: 0
    }
};

function MovieCard({ movie, onAdd }: MovieCardProps) {
    const poster = movie.poster?.previewUrl ?? movie.poster?.url;
    const genres = movie.genres?.map(g => g.name).join(" · ") ?? "—";
    const ratingTmdb = movie.rating?.tmdb;

    return (
        <motion.article
            className={styles.movieCard}
            variants={item}
            whileHover={{
                y: -5,
                scale: 1.02
            }}
            whileTap={{
                scale: 0.98,
                backgroundColor: "#4b658f"
            }}>
            <div className={styles.movieImage}>
                {poster ? (
                    <img
                        src={poster}
                        alt={movie.name}
                        loading="lazy"
                    />
                ) : (
                    <div className={styles.movieImagePlaceholder}>
                        Нет постера
                    </div>
                )}
            </div>

            <div className={styles.movieInfo}>
                <h2
                    className={styles.movieTitle}
                    title={movie.name}
                >
                    {movie.name}
                </h2>

                <p className={styles.movieMeta}>
                    {movie.year}
                    {movie.isSeries && " · сериал"}
                </p>

                <p className={styles.movieGenres}>
                    {genres}
                </p>

                <div className={styles.movieRatings}>
                    {ratingTmdb !== undefined && (
                        <span
                            className={`${styles.rating} ${styles.ratingTmdb}`}
                        >
                            TMDB {ratingTmdb.toFixed(1)}
                        </span>
                    )}
                </div>
            </div>

            <div className={styles.movieBottom}>
                <Button onClick={() => onAdd(movie)}>
                    Смотреть
                </Button>
            </div>
        </motion.article>
    );
}

export default MovieCard;