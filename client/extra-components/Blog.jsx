import * as React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

function Blog(props) {
    return (
        // <div
        //     style={{
        //         border: '1px solid black',
        //     }}
        // >
        //     <h4>{props.title}</h4>
        //     <h4>{props.description}</h4>
        // </div>
        <Grid item xs={12} md={6}>
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
        </Grid>
    )
}

export default Blog
