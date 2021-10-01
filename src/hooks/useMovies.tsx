import { useEffect, useState } from "react";
import movieDB from "../api/MovieDB";
import { Movie, MovieBbResponse } from "../interfaces/MovieInterface";

interface MoviesState {
    nowPlaying: Movie[],
    popular: Movie[] ,
    topRated: Movie[],
    upcoming: Movie[]
}

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [ moviesState, setMoviesState ] = useState<MoviesState>({
        nowPlaying: [],
        popular: [] ,
        topRated: [],
        upcoming: []
    })

    const getMovies = async () => {

        const nowPlayingPromise =  movieDB.get<MovieBbResponse>('/now_playing');
        const popularPromise = movieDB.get<MovieBbResponse>('/popular');
        const topRatedPromise = movieDB.get<MovieBbResponse>('/top_rated');
        const upcomingPromise = movieDB.get<MovieBbResponse>('/upcoming');

        const response = await Promise.all([
            nowPlayingPromise, 
            popularPromise, 
            topRatedPromise, 
            upcomingPromise
        ]);


        setMoviesState({
            nowPlaying: response[0].data.results,
            popular: response[1].data.results,
            topRated: response[2].data.results,
            upcoming: response[3].data.results
        });

        setIsLoading( false );
    }
    useEffect(() => {
        // Now_Playing
        getMovies();
    }, [])

    return {
        ...moviesState,
        isLoading
    }
};