export interface Genre {
    id: number;
    name: string;
    slug?: string;
}

export interface MovieRating {
    kp?: number;
    imdb?: number;
    tmdb?: number;
    filmCritics?: number;
    russianFilmCritics?: number;
}

export interface Poster {
    url: string;
    previewUrl?: string;
}

export interface Movie {
    id: number;
    name: string;
    alternativeName?: string;
    year: number;
    type: string;
    rating: MovieRating;
    genres: Genre[];
    poster: Poster;

    // необязательные поля — они приходят не всегда
    shortDescription?: string;
    description?: string;
    movieLength?: number;
    seriesLength?: number;
    isSeries?: boolean;
    countries?: { id: number; name: string }[];
}

export interface TMDBMovie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
}

export interface TMDBGenre {
    id: number;
    name: string;
}

export interface Watch extends Movie {
    WatchId: number;
}