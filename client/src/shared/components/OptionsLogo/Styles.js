import styled from "styled-components";

export const OptionsLogoContainer = styled.div`
  position: relative;
`;

export const Dots = styled.img`
  src: url(${(props) => props.src});
  cursor: pointer;
`;
