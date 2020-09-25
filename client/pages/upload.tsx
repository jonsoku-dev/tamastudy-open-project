import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import {
  MutationUploadFileArgs,
  UploadFileDocument,
  UploadFileMutation,
} from '../generated/graphql';

export interface uploadProps {}

const upload: React.FC<uploadProps> = () => {
  const [preview, setPreview] = useState('');
  const [mutate, { loading, error }] = useMutation<UploadFileMutation, MutationUploadFileArgs>(
    UploadFileDocument,
  );
  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => {
    setPreview(URL.createObjectURL(file));
    return validity.valid && mutate({ variables: { file } });
  };

  useEffect(
    () => () => {
      URL.revokeObjectURL(preview);
    },
    [preview]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <React.Fragment>
      <input type="file" required onChange={onChange} />
      {preview && <img src={preview} alt={preview} style={{ width: '300px', height: '300px' }} />}
    </React.Fragment>
  );
};

export default upload;
