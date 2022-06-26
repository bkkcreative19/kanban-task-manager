import styled from "styled-components";

import {
  color,
  sizes,
  font,
  mixin,
  zIndexValues,
} from "../../shared/utils/styles";

export const Header = styled.div`
  background: ${({ theme }) => theme.headerBG};
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

export const Nav = styled.nav`
  display: flex;
  // padding: 0 2em;
  // margin-top: 2em;

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.mainBorder};
  padding-left: 24px;
  // box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  width: 300px;

  @media screen and (max-width: 768px) {
    border: none;
  }
`;

export const Lines = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;

  .line {
    width: 6px;
    height: 25px;
    background: #635fc7;
    border-radius: 2px;

    &:nth-child(2) {
      opacity: 0.75;
    }
    &:last-child {
      opacity: 0.5;
    }
  }
`;

export const LogoName = styled.h1`
  font-size: 3.2rem;
  margin-left: 0.5em;
  color: ${({ theme }) => theme.mainText};

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Right = styled.div`
  flex: auto;
  // margin-left: 3em;
  padding: 1.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.mainBorder};

  @media screen and (max-width: 768px) {
    justify-content: stretch;
  }

  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

export const Title = styled.h2`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.mainText};
  font-weight: 700;
`;
export const DownArrow = styled.img`
  src: url(${(props) => props.src});
  display: none;
  margin-left: 1.7em;

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    margin-left: auto;
  }
`;
export const AddTask = styled.button`
  background: #635fc7;
  color: #fff;
  padding: 1.2em 1.7em;
  border-radius: 30px;
  border: none;
  font-size: 1.5rem;
  font-weight: 700;
  margin-right: 2em;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const Cross = styled.button`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    background: #635fc7;
    color: #fff;
    padding: 1.2em 1.7em;
    border-radius: 30px;
    border: none;
    font-size: 1.5rem;
    font-weight: 700;
    margin-right: 2em;
    cursor: pointer;
  }
`;

export const Dots = styled.img`
  src: url(${(props) => props.src});
`;

// export const LinkText = styled.div`
//   padding-top: 2px;
//   ${font.size(14.7)};
// `;

// export const NotImplemented = styled.div`
//   display: inline-block;
//   position: absolute;
//   top: 7px;
//   left: 40px;
//   width: 140px;
//   padding: 5px 0 5px 8px;
//   border-radius: 3px;
//   text-transform: uppercase;
//   color: ${color.textDark};
//   background: ${color.backgroundMedium};
//   opacity: 0;
//   ${font.size(11.5)};
//   ${font.bold}
//   ${LinkItem}:hover & {
//     opacity: 1;
//   }
// `;
