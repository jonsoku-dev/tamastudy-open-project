import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 2fr 6fr;
  margin: 32px 0;
  font-size: 1.4rem;
  position: relative;
`;
export const Input = styled.input`
  outline: none;
  padding: 0 1em;
  width: 100%;
`;
export const Button = styled.button`
  position: absolute;
  right: 8px;
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
