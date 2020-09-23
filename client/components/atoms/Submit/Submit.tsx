import React from 'react';

export interface SubmitProps {
    name?: string;
}

const Submit: React.FC<SubmitProps> = ({ name = 'Submit' }) => {
    return <input type={'submit'} value={name} />;
};

export default Submit;
