import React from "react";
import styled from "styled-components";

const BackBlack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%
  width: 100%;
  background: rgba( 0, 0, 0, 0.6);
`;

const Backdrop = () => <BackBlack />;

export default Backdrop;
