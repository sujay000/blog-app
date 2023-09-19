import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import { Link } from 'react-router-dom'

function Blog(props) {
    return (
        <Grid item xs={12} md={6}>
            {/* <Link to={`readblog/${props.id}`} style={{ textDecoration: 'none' }}> */}
            <CardActionArea component="a" href="#">
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h3" variant="h5">
                            {props.title}
                        </Typography>
                        {/* <Typography variant="subtitle1" color="text.secondary">
                            {props.date}
                        </Typography> */}
                        <Typography variant="subtitle1" paragraph>
                            {props.description.substring(0, 400)}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                            Continue reading...
                        </Typography>
                    </CardContent>
                    {/* <CardMedia
                        component="img"
                        sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                        image={props.image}
                        alt={props.imageLabel}
                    /> */}
                </Card>
            </CardActionArea>
            {/* </Link> */}
        </Grid>
    )
}

export default Blog
