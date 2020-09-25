import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-flex;
  position: relative;
  min-width: 100px;
  max-width: 100%;
`;
export const Input = styled.input`
  outline: none;
  padding: 1em;
  width: 100%;
`;
export const Button = styled.button`
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  border: none;
  background: none;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
`;
