import type { Watch } from "../../domain/MovieBase";
import styles from "./WatchList.module.css"
import { Trash2 } from 'lucide-react';

interface WatchListProps {
    watch: Watch[],
    onRemove: (watchId: number) => void
}

function WatchList({ watch, onRemove }: WatchListProps) {
    return (
        <div className={styles.watch_panel}>
            <h2>Посмотреть позже</h2>

            {watch.length === 0 ? (
                <p>Список пока пуст</p>
            ) : (
                <>
                    {watch.map(movie => (
                        <div className={styles.watch_item} key={movie.WatchId}>
                            <span>
                                {movie.name}
                            </span>

                            <button
                                onClick={() => onRemove(movie.WatchId)}
                            >
                                <Trash2 />
                            </button>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default WatchList;