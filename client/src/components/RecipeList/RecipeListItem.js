import React, { useState, useEffect } from "react";

import styled from "styled-components";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  IconButton,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { motion } from "framer-motion";

import Recipe from "../Recipe/Recipe";

const Cont = styled(Card)`
  display: flex;
  margin: 3vh 0 3vh 0;
  border-bottom: 1px solid black;
`;

const CardImage = styled(motion(CardMedia))`
  min-width: 20vw;
  height: 25vh;
`;

const CardContents = styled(CardContent)`
  margin: 2vh;
  overflow: auto;

  div {
    display: flex;
  }

  #chip {
    margin: 0 5px 0 5px;
  }
`;

const MoreIcon = styled(IconButton)`
  height: 10px;
`;

const Panel = styled(motion.div)`
  height: 100vh;
  width: 50vw;
  position: absolute;
  z-index: 15;
  background: #e7e7de;

  &.leftPanel {
    left: 0;
  }

  &.rightPanel {
    right: 0;
  }
`;

const parent = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 1.1,
    },
  },
};

const transitions = { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] };

const RecipeListItem = (props) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(true);
  };

  return (
    <Cont>
      <CardImage
        whileHover={{
          scale: 1.1,
        }}
        image={props.recipe.image}
        title={props.recipe.sourceImage}
        onClick={handleClick}
      />
      <CardContents>
        <Typography component="h5" variant="h5">
          {props.recipe.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          <p dangerouslySetInnerHTML={{ __html: props.recipe.summary }} />
        </Typography>
        <div>
          {props.recipe.vegetarian && <Chip id="chip" label="Vegetarian" />}
          {props.recipe.vegan && <Chip id="chip" label="Vegan" />}
          {props.recipe.dairyFree && <Chip id="chip" label="Dairy Free" />}
          {props.recipe.glutenFree && <Chip id="chip" label="Gluten Free" />}
        </div>
      </CardContents>
      <MoreIcon>
        <MoreVertIcon />
      </MoreIcon>
      <Recipe
        open={openModal}
        setOpen={setOpenModal}
        pps={props.recipe.pricePerServing / 100}
        {...props}
      />
    </Cont>
  );
};

export default RecipeListItem;
