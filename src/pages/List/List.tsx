import React, { useState, useEffect } from 'react';
import styles from './List.module.css';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Mansory from '@mui/lab/Masonry';
import { Tv, Movie } from '@mui/icons-material'
import ListItem from './ListItem';
import axios from 'axios';

function List() {

    const [isMovie, setIsMovie] = useState(false);
    const [listMovies, setListMovies] = useState([]);
    const [listTvShows, setListTvShows] = useState([]);
    const [currentList, setCurrentList] = useState([]);


    useEffect(() => {
        const apiURL = "https://api.themoviedb.org/3/", apiEndpointMovies = "movie/popular", apiEndpointTV = "tv/popular"
        const apiKey = "?api_key=9a4c68c1f17b03ce26e0eb38b68f2baf", apiLang = "&language=en-US";
        const fetchData = () => {
            //   setLoading(true);
            try {
                axios.get(apiURL + apiEndpointMovies + apiKey + apiLang).then((result) => {
                    setListMovies(result.data.results || []);
                });

                axios.get(apiURL + apiEndpointTV + apiKey + apiLang).then((result) => {
                    setListTvShows(result.data.results || []);
                });

                setCurrentList(isMovie ? listMovies : listTvShows)
            } catch (error) {
                // console.error(error.message);
            }
            //   setLoading(false);
        }

        fetchData();
    }, []);


    return (
        <div className={styles.List}>

            <header className={styles.header}>
                <h1>Paramount List</h1>
            </header>

            <section>
                <div className={styles.switchCnt}>
                    <FormControlLabel control={
                        <Switch size='medium' color='error' value={isMovie} onChange={() => {
                            setCurrentList(isMovie ? listMovies : listTvShows)
                            setIsMovie(!isMovie)

                        }} icon={<Movie />} checkedIcon={<Tv />} />
                    } label={isMovie ? "Movies" : "TV Shows"} labelPlacement={isMovie ? "start" : "end"} />

                </div>
                <div className={styles.mansoryCnt}>
                    <Mansory columns={4} spacing={2}>
                        {currentList.map((item) => {
                            return (<ListItem item={item} isSimilar={false} isMovie={isMovie}></ListItem>)
                        })}
                    </Mansory>

                </div>
            </section>

            <footer className={styles.footer}>
                <span>@sazouache Web Test</span>
            </footer>
        </div>
    );
}

export default List;

