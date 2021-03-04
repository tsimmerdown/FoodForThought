import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const CustomCursor = styled.div`
  z-index: 100000;
  border-radius: 50%;
  width: ${(props) => (props.hover ? "75px" : "50px")};
  height: ${(props) => (props.hover ? "75px" : "50px")};
  border: 1px solid black;
  pointer-events: none;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  position: fixed;
`;

const Cursor = ({ hover }) => {
  const cursorRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;
      const mouseX = clientX - cursorRef.current.clientWidth / 2;
      const mouseY = clientY - cursorRef.current.clientHeight / 2;
      cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });
  }, []);

  return <CustomCursor hover={hover} ref={cursorRef} />;
};

export default Cursor;
