import React from "react";
import styled from "styled-components";
import { List, ListItem, Modal, Paper, Typography } from "@material-ui/core";
import { motion } from "framer-motion";

const ModalContainer = styled(Modal)`
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled(motion(Paper))`
  padding: 1.5rem;
  min-width: 60vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  div {
    display: flex;
  }
`;

const RecipeImage = styled.img`
  width: 30vw;
  margin: 1vh;
`;

const RecipeIngredients = styled.div`
  height: 8vh;
  flex-direction: column;
  margin-right: 2vw;
`;

const RecipeInstructions = styled.div`
  flex-grow: 2;
  height: 8vh;
  flex-direction: column;
`;

const RecipeDirections = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  #title {
    height: auto;
    width: 100%;
    border-bottom: 5px solid rgba(0, 0, 0, 0.9);
  }
  #box {
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    margin: 0;
    height: 3vh;
    padding: 5px;
  }
  #list {
    padding-left: 2vw;
  }
`;

const modalAnimation = {
  initial: {
    y: "-100vh",
    opacity: 0,
  },
  animate: {
    y: "0",
    opacity: 1,
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const transitions = { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] };

const Recipe = (props) => {
  const handleClose = () => {
    props.setOpen(false);
  };
  return (
    <ModalContainer
      open={props.open}
      onClose={handleClose}
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(2px)",
      }}
    >
      {props.open && (
        <ModalContent
          initial="initial"
          animate="animate"
          exit="exit"
          variants={modalAnimation}
          transition={transitions}
        >
          <Typography variant="h4">{props.recipe.title}</Typography>
          <div>
            <Typography variant="subtitle1" style={{ marginRight: "2vw" }}>
              <strong>Price/serving: </strong>$
              <Typography variant="caption">{props.pps}</Typography>
            </Typography>
            <Typography variant="subtitle1" style={{ marginRight: "2vw" }}>
              <strong>Total Time: </strong>
              <Typography variant="caption">
                {props.recipe.readyInMinutes} min
              </Typography>
            </Typography>
            <Typography variant="subtitle1">
              <strong>Servings: </strong>
              <Typography variant="caption">{props.recipe.servings}</Typography>
            </Typography>
          </div>
          <RecipeImage src={props.recipe.image} />
          <RecipeDirections>
            <RecipeIngredients>
              <div id="title">
                <div id="box">INGREDIENTS</div>
                <div id="line"></div>
              </div>
              <List id="list">
                {props.recipe.missedIngredients.map((ingredient) => {
                  return (
                    <ListItem style={{ width: "20vw", margin: 0 }}>
                      {ingredient.original}
                    </ListItem>
                  );
                })}
              </List>
            </RecipeIngredients>
            <RecipeInstructions>
              <div id="title">
                <div id="box">INSTRUCTIONS</div>
                <div id="line"></div>
              </div>
              <List id="list">
                {props.recipe.analyzedInstructions[0].steps.map(
                  (instruction) => {
                    return (
                      <ListItem style={{ width: "30vw", margin: 0 }}>
                        {`${instruction.number}.  ${instruction.step}`}
                      </ListItem>
                    );
                  }
                )}
              </List>
            </RecipeInstructions>
          </RecipeDirections>
        </ModalContent>
      )}
    </ModalContainer>
  );
};

export default Recipe;
