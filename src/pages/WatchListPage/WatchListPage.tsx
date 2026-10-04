import WatchList from '../../components/WatchList/WatchList';
import type { Watch } from '../../domain/MovieBase';

import styles from './WatchListPage.module.css';

interface WatchListPageProps {
    watch: Watch[];
    onRemove: (watchId: number) => void;
}

function WatchListPage({
    watch,
    onRemove
}: WatchListPageProps) {
    return (
        <section className={styles.page}>
            <h2 className={styles.title}>Мой список</h2>

            {watch.length === 0 ? (
                <p className={styles.empty}>
                    В списке пока нет фильмов
                </p>
            ) : (
                <WatchList
                    watch={watch}
                    onRemove={onRemove}
                />
            )}
        </section>
    );
}

export default WatchListPage;