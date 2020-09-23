import React from 'react';

export interface FormProps {
    onSubmit: any;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
    return <form onSubmit={onSubmit}>{children}</form>;
};

export default Form;
