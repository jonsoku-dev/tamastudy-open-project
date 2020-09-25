import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{
  isEdit?: boolean;
}>`
  ${(p) => !p.isEdit && css``}
`;
export const Form = styled.form`
  width: 100%;
  position: relative;
`;
export const Select = styled.div`
margin: 16px 0;
`;
export const Input = styled.textarea`
  width: 100%;
  margin-right: auto;
  padding: 12px;
  font-size: 1.6rem;
  outline: none;
  resize: none;
  min-height: 56px;
  max-height: 400px;
  font-family: 'Apple SD Gothic Neo Arial';
  line-height: 1.2;
`;
export const Submit = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  &:hover {
    background-color: #f3f3f3;
  }
`;
