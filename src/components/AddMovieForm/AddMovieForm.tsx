import { useForm } from 'react-hook-form';
import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { addMovie } from '../../services/movieService';

import styles from './AddMovieForm.module.css';

const movieSchema = z.object({
    name: z.string().min(1, 'Введите название фильма'),
    year: z.number().min(1900, 'Год должен быть не меньше 1900')
});

type FormData = z.infer<typeof movieSchema>;

function AddMovieForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(movieSchema)
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addMovie,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['movies']
            });
        }
    });

    function onSubmit(data: FormData) {
        mutation.mutate(data);
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className={styles.title}>
                Добавить фильм
            </h2>

            <div className={styles.field}>
                <label className={styles.label}>
                    Название фильма
                </label>

                <input
                    className={styles.input}
                    {...register('name')}
                    placeholder="Например, Интерстеллар"
                />

                {errors.name && (
                    <p className={styles.error}>
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className={styles.field}>
                <label className={styles.label}>
                    Год
                </label>

                <input
                    className={styles.input}
                    {...register('year', {
                        valueAsNumber: true
                    })}
                    type="number"
                    placeholder="Например, 2014"
                />

                {errors.year && (
                    <p className={styles.error}>
                        {errors.year.message}
                    </p>
                )}
            </div>

            <button
                className={styles.button}
                type="submit"
                disabled={mutation.isPending}
            >
                {mutation.isPending
                    ? 'Добавление...'
                    : 'Добавить фильм'}
            </button>

            {mutation.isSuccess && (
                <p>
                    Фильм добавлен!
                </p>
            )}

            {mutation.isError && (
                <p className={styles.error}>
                    Ошибка добавления фильма
                </p>
            )}
        </form>
    );
}

export default AddMovieForm;