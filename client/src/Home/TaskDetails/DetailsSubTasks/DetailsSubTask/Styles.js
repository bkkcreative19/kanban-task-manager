import styled from "styled-components";

export const SubtasksItem = styled.div`
  display: flex;
  background: #f4f7fd;
  border-radius: 4px;
  margin-top: 1em;
  padding: 1.5em;
  align-items: center;
`;

export const SubtasksItemCheck = styled.span`
  background: ${({ isCompleted }) => (isCompleted ? "#635fc7" : "#ffffff")};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border: 1px solid rgba(130, 143, 163, 0.248914);
  cursor: pointer;
`;
export const SubtasksItemCheckIcon = styled.img`
  src: url(${(props) => props.src});
  flex: 1;
`;

export const SubtasksItemText = styled.span`
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #000112;
  opacity: 0.5;
  margin-left: 1em;
  flex: 3;
  text-decoration: ${({ isCompleted }) => (isCompleted ? "line-through" : "none")};
`;
