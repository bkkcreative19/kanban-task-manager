import styled, { css } from "styled-components";

export const Task = styled.div`
  background: ${({ theme }) => theme.taskBG};
  // margin-top: 2em;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.101545);
  border-radius: 8px;
  padding: 2em 1.5em;
  margin-bottom: 2em;
  ${(props) =>
    props.isBeingDragged &&
    css`
      transform: rotate(3deg);
      box-shadow: 5px 10px 30px 0px rgba(9, 30, 66, 0.15);
    `}
`;

export const TaskTitle = styled.h3`
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  color: ${({ theme }) => theme.mainText};
`;

export const TaskSub = styled.p`
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #828fa3;
  margin-top: 1em;
`;
