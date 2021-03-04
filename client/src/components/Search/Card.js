import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Image = styled.img`
  height: 100%;
  width: 100%;
  paddingtop: 56.25%;
  background-size: contain;
`;

const ContentCont = styled(CardContent)`
  max-height: 100px;
  overflow: auto;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 360,
    backgroundColor: "lightgrey",
  },
  media: {
    height: 0,
    width: "100%",
    paddingTop: "56.25%",
    backgroundSize: "cover", // 16:9
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const RecommendedCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.data.healthScore}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      {/* <CardMedia
        className={classes.media}
        image={props.data.image}
        title="Paella dish"
      /> */}
      <Image src={props.data.image} />
      <ContentCont>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.data.summary}
        </Typography>
      </ContentCont>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RecommendedCard;
