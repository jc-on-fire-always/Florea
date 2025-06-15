import { Link } from "react-router-dom";
import styled from "styled-components";

import img from "../assets/logog.png";

const Container = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 6;

  width: 100%;
  width: fit-content;

  a {
    width: 100%;
    display: flex;
    align-items: flex-end;
  }

  svg {
    width: 4rem;

    height: auto;
    overflow: visible;
    stroke-linejoin: round;
    stroke-linecap: round;
    g {
      path {
        stroke: #fff;
      }
    }
  }
`;

const Logo = () => {
  return (
    <Container>
      <Link to="/">
        <img src={img} alt="Floréa Logo" height={60} width={150} />
      </Link>
    </Container>
  );
};

export default Logo;
