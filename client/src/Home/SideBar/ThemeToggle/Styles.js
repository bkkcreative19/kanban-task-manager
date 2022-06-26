import styled from "styled-components";

export const Toggle = styled.div`
  background: #f4f7fd;
  display: flex;
  padding: 1.3em 0;
  margin: auto 2.4em 2em;
  justify-content: center;
`;

export const Slider = styled.div`
  background: #635fc7;
  width: 40px;
  display: flex;
  margin: 0 2.5em;
  align-items: center;
  border-radius: 12px;
  padding: 0 0.3em;
  position: relative;
  cursor: pointer;
`;

export const Circle = styled.div`
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background: #ffffff;
  position: absolute;
  left: ${(props) => (props.theme === "dark" ? "23px" : "3px")};
  transition: all 0.3s;
`;

export const ThemeImage = styled.img`
  src: url(${(props) => props.src});
`;
