import styled from "styled-components";

export const SideBar = styled.aside`
  border-right: 1px solid ${({ theme }) => theme.mainBorder};
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  background: ${({ theme }) => theme.headerBG};
  width: 300px;
  height: 91vh;
  position: relative;
  // box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h3`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #828fa3;
  padding: 0 2em;
  letter-spacing: 2.4px;
  margin-top: 1.3em;
  margin-bottom: 0.5em;
`;

export const BoardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5em;
`;

export const Board = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme, isActive }) => (isActive ? theme.mainPurple : "")};
  padding: 1.8em 2.4em;
  cursor: pointer;
  margin-right: 1.5em;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const BoardIcon = styled.img`
  src: url(${(props) => props.src});
  pointer-events: none;
`;

export const BoardTitle = styled.h4`
  font-size: 15px;
  color: ${({ theme, isActive }) => (isActive ? "#ffffff" : "#828fa3")};
  margin-left: 1em;
  pointer-events: none;
`;

export const HideSideBar = styled.div`
  margin-top: 1em;
  margin-bottom: 4em;
  padding: 0 2.4em;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const HideSideBarIcon = styled.img`
  src: url(${(props) => props.src});
`;
export const HideSideBarText = styled.span`
  color: #828fa3;
  font-weight: 700;
  font-size: 15px;
  margin-left: 1em;
`;
