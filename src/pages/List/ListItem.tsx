import React from 'react';
// import styles from './ListItem.module.css';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function ListItem(props: {
    item: {
        id: number;
        poster_path: string | undefined;
        overview: string | null | undefined;
        title: string | null | undefined;
        name: string | null | undefined;
    },
    isSimilar: boolean,
    isMovie: boolean;
}) {

    const navigate = useNavigate();

    const goDetail = () => {
        navigate('/detail', { state: { id: props.item.id, isMovie: props.isMovie } });
    }

    return (
        <Card sx={{ maxWidth: 345 }} key={props.item.id}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={"https://image.tmdb.org/t/p/original/" + props.item.poster_path}
                    alt={props.item.title || props.item.name || "Item img"}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.item.title || props.item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.item.overview}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {props.isSimilar ? null : (<CardActions>
                <Button size="small" color="primary" onClick={goDetail}>
                    Details
                </Button>
            </CardActions>)}

        </Card>
    );
}

export default ListItem;
