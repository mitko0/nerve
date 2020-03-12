import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Challenge from "../Challenge/Challenge";
import Response from "../Response/Response";

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '100%',
        marginBottom: '50px',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const Post = (props) => {
    const classes = useStyles();

    return (
        <Card raised className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        <img src={props.avatarSrc} alt={props.avatarAlt} className='border-dark'/>
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={props.title}
                subheader={props.subheader}
            />
            <Challenge description={props.description} />
            <hr/>
            <Response name={props.name} challengeId={props.challengeId} owner={props.owner}/>
            {/*<div>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating
                        name={props.name}
                        value={value}
                        onChange={(event, value) => handleRating(value)}
                    />
                </Box>
                <img src={"https://dummyimage.com/600x400/fff/000000"} alt={''} className='img-fluid w-100'/>
            </div>*/}
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Post;