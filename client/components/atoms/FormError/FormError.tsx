import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.p`
    color: red;
`;

export interface FormErrorProps {
    message: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
    return <Wrapper>{message}</Wrapper>;
};

export default FormError;
