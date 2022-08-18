import styled from "styled-components";

export const BoardAdd = styled.div`
  padding: 3em;
`;

export const BoardAddHead = styled.h3`
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  color: #000112;
`;
export const BoardAddInput = styled.form`
  display: flex;
  flex-direction: column;
  margin: 1.4em 0;
`;
export const BoardAddInputLabel = styled.label`
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #828fa3;
  margin-bottom: 0.8em;
`;
export const BoardAddInputField = styled.input`
  width: 100%;
  padding: 0.8em 0.8em;
  border: 1px solid rgba(130, 143, 163, 0.25);
  border-radius: 4px;
  &::placeholder {
    opacity: 0.25;
  }
`;
export const BoardAddColumnList = styled.div`
  margin-top: 1em;
`;
export const BoardAddColumnHead = styled.h3`
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #828fa3;
`;
export const BoardAddColumnItem = styled.div`
  margin-top: 1em;
  display: flex;
  align-items: center;
`;
export const BoardAddColumnInput = styled.input`
  width: 100%;
  padding: 0.8em 0.8em;
  border: 1px solid rgba(130, 143, 163, 0.25);
  border-radius: 4px;
  margin-right: 0.5em;
  &::placeholder {
    opacity: 0.25;
  }
`;
export const BoardAddColumnX = styled.span`
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0 0.8em;
`;

export const AddColumnBtn = styled.button`
  background: rgba(99, 95, 199, 0.1);
  border-radius: 20px;
  width: 100%;
  padding: 0.6em 1.2em;
  font-weight: 700;
  font-size: 13px;
  line-height: 23px;
  color: #635fc7;
  border: none;
  margin-top: 1.3em;
  cursor: pointer;
`;

export const CreateBoard = styled.button`
  background: #635fc7;
  border-radius: 20px;
  border: none;
  margin-top: 1.3em;
  cursor: pointer;
  color: #ffffff;
  font-weight: 700;
  font-size: 13px;
  line-height: 23px;
  width: 100%;
  padding: 0.6em 1.2em;
`;
