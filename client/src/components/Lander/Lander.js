import React from "react";
import styled from "styled-components";
import { Typography, Button } from "@material-ui/core/index";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import transitions from "@material-ui/core/styles/transitions";

import ReactPlayer from "react-player";
import BgVideo from "../../ripe_strawberries_falling_through_the_water.mp4";

const LanderCont = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;
const AnimatedText = styled(motion.h1)`
  font-size: 50px;

  #mask {
    position: absolute;
    z-index: 10;
    height: 60px;
    width: 100%;
    background: white;
  }
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

const StartButton = styled(motion(Button))``;
const AnimatedLink = styled(motion(Link))``;

//Variants

const parent = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
  },
};

const landerText = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 },
};

const maskAnimation = {
  initial: { height: "100%" },
  animate: { height: "0" },
  exit: { height: "100%" },
};
//Transitions
const transition = { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] };

const Lander = () => {
  return (
    <>
      <LanderCont
        variants={parent}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <AnimatedText variants={landerText} transition={transition}>
          {/* <motion.div
            id="mask"
            transition={{ ...transitions, duration: 1 }}
            variants={maskAnimation}
          /> */}
          Welcome to Food For Thought
        </AnimatedText>

        <AnimatedLink
          to="/auth"
          style={{ textDecoration: "none" }}
          variants={landerText}
          transition={{ ...transitions, duration: 0.5 }}
        >
          <StartButton variants={landerText} contained>
            Get Started
          </StartButton>
        </AnimatedLink>
        <ReactPlayer
          url={BgVideo}
          playing={true}
          muted={true}
          width="115%"
          height="130%"
          loop={true}
          style={{ position: "absolute", zIndex: "-1", overflow: "hidden" }}
        />
      </LanderCont>
      {/* <Panels /> */}
    </>
  );
};

export default Lander;
