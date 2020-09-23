import styled from 'styled-components';

export const Wrapper = styled.div`
  font-family: 'Arial';
  line-height: 1.6;
  font-size: 1.33rem;
`;
export const Input = styled.input`
  width: 100%;
  background-color: hsl(0, 0%, 100%);
  border-color: hsl(0, 0%, 80%);
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  height: 38px;
  padding: 0 8px;
`;
export const Textarea = styled.textarea`
  width: 100%;
  background-color: hsl(0, 0%, 100%);
  border-color: hsl(0, 0%, 80%);
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  height: 38px;
  padding: 16px;
  min-height: 320px;
  resize: none;
  font-family: 'Arial';
  line-height: 1.6;
  font-size: 1.33rem;
`;
export const Submit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
`;
