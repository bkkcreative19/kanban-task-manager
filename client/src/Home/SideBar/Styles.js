import styled from "styled-components";

export const SideBar = styled.aside`
  border-right: 1px solid ${({ theme }) => theme.mainBorder};
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.headerBG};
  width: 300px;
  height: 91vh;
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
