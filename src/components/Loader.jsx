import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import videoSrc from "../assets/loader.mp4";

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  touch-action: none;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  z-index: 6;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;

  video {
    width: 40vw;
    height: auto;

    @media (max-width: 768px) {
      width: 70vw;
    }

    @media (max-width: 480px) {
      width: 90vw;
    }
  }
`;

const Loader = () => {
  return (
    <Container
      initial={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <video autoPlay loop muted>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </Container>
  );
};

export default Loader;
