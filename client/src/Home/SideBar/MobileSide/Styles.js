import styled from "styled-components";

export const MobileSideMenu = styled.div`
  position: relative;
`;

export const MobileSideMenuTitle = styled.h3`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #828fa3;
  padding: 0 2em;
  letter-spacing: 2.4px;
  margin-top: 1.3em;
  margin-bottom: 0.5em;
`;

export const MobileSideMenuBoardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5em;
`;

export const MobileSideMenuBoard = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme, isActive }) => (isActive ? theme.mainPurple : "")};
  padding: 1.8em 2.4em;
  cursor: pointer;
  margin-right: 1.5em;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const MobileSideMenuBoardIcon = styled.img`
  src: url(${(props) => props.src});
  pointer-events: none;
`;

export const MobileSideMenuBoardTitle = styled.h4`
  font-size: 15px;
  color: ${({ theme, isActive }) => (isActive ? "#ffffff" : "#828fa3")};
  margin-left: 1em;
  pointer-events: none;
`;

export const MobileSideMenuAddBoardBtn = styled.div`
  padding: 1.8em 2.4em;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const MobileSideMenuAddBoardBtnText = styled.span`
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  color: #635fc7;
  margin-left: 1em;
`;
