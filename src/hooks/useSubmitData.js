import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../api';
import { useState } from 'react';

const useSubmitData = () => {
  const queryClient = useQueryClient();

  const [error, setError] = useState(null);

  const postData = async (data) => {
    const response = await axios.post('/os/', data);
    return response?.data;
  }

  const { mutate, isPending } = useMutation({
    mutationFn: postData,
    onSuccess: (_response, formData) => {
      const data = formData?._parts
      const newImage = {
        os: data?.[0]?.[1],
        step: data?.[2]?.[1],
      }
      queryClient.invalidateQueries({ queryKey: ['content', {step: newImage?.step}, {os: newImage?.os}] });
    },
    onError: (_error, newImage, context) => {
      queryClient.setQueryData(['content', {step: newImage?.step}, {os: newImage?.os}], context?.previousImagesList)
      setError(`'Erro ao enviar a foto. Tente novamente e se persistir, entre em contato com o Administrador.' ${_error}`);
    },
  });

  return {
    handleSubmit: mutate,
    isPending,
    error,
    setError,
  };
};

export default useSubmitData;
