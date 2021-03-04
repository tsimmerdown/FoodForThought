import React from "react";
import styled from "styled-components";

import ListItem from "@material-ui/core/ListItem";

const Cont = styled.div`
  display: flex;
`;
const Image = styled.img`
  height: 5vh;
  width: 5vw;
`;

const ImageText = styled.p`
  margin-left: 2vw;
`;
const SearchItem = ({ recipe }) => {
  return (
    <ListItem>
      <Cont>
        <Image src={recipe.image} alt={`${recipe.title} pic`} />
        <ImageText>{recipe.title}</ImageText>
      </Cont>
    </ListItem>
  );
};

export default SearchItem;
