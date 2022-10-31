import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Details.module.css';
import axios from 'axios';
import ListItem from '../List/ListItem';
import Button from '@mui/material/Button';

const Details = () => {

    let { state } = useLocation();
    let { id,isMovie } = state;

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/list');
    }

    const [details, setDetail] = useState({ name: "", title: "", poster_path: "", overview: "", release_date: "", first_air_date:"" })
    const [similars, setSimilars] = useState([])

    useEffect(() => {
        const apiURL = "https://api.themoviedb.org/3/", apiEndpointDetail = `${isMovie ? 'tv': 'movie'}/${id}`, apiEndpointSimilar = `movie/${id}/similar`
        const apiKey = "?api_key=9a4c68c1f17b03ce26e0eb38b68f2baf", apiLang = "&language=en-US";
        const fetchData = () => {
            //   setLoading(true);
            try {
                
                axios.get(apiURL + apiEndpointDetail + apiKey + apiLang).then((result) => {
                    setDetail(result.data || []);
                    console.log(result)
                });

                axios.get(apiURL + apiEndpointSimilar + apiKey + apiLang).then((result) => {
                    setSimilars(result.data.results || []);
                    console.log(result)
                });
            } catch (error) {
                // console.error(error.message);
            }
            //   setLoading(false);
        }

        fetchData();
    }, []);

    return (
        <div className={styles.Detail}>

            <header className={styles.header}>
                <span>
                    <Button onClick={goBack} color="info">
                        Back
                    </Button></span>
                <h1>Paramount List</h1>
            </header>

            <section>
                <div className={styles.block1}>
                    <div className={styles.itemImg}>
                        <img src={"https://image.tmdb.org/t/p/original/" + details.poster_path} alt={details.poster_path} />
                    </div>
                    <div className={styles.contentCnt}>
                        <h1>{details.name || details.title}</h1>
                        <small>Released: {details.release_date || details.first_air_date}</small>
                        <p>{details.overview}</p>
                    </div>
                </div>


                <div >
                    <h1>Similars</h1>
                    <div className={styles.block2}>
                        {similars.map((item) => {
                            return (<ListItem item={item} isSimilar isMovie={isMovie}></ListItem>)
                        })}
                    </div>
                </div>
            </section>

            <footer className={styles.footer}>
                <span>@sazouache Web Test</span>
            </footer>
        </div>
    );
}

export default Details;
