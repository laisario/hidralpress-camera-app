import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../api';
import { useState } from 'react';

const useSubmitData = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);

  const postData = async (data) => {
    const response = await axios.post('/os/', data);
    return response.data;
  }

  function toISOStringWithOffset(date) {
    const isoString = date.toISOString(); // Get UTC time

    // Get timezone offset in minutes
    const offsetMinutes = date.getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
    const offsetMins = Math.abs(offsetMinutes % 60);
    const offsetSign = offsetMinutes > 0 ? '-' : '+';

    // Construct timezone offset string
    const timezoneOffset = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMins).padStart(2, '0')}`;

    // Replace the UTC 'Z' with the local timezone offset
    return isoString.replace('Z', '') + timezoneOffset;
}

  const { mutate, isPending } = useMutation({
    mutationFn: postData,
    onMutate: async (formData) => {
      const data = formData?._parts
      const newImage = {
        id: Math.floor((Math.random() * 1000)) * -1,
        os: data?.[0]?.[1],
        step: data?.[2]?.[1],
        image: data?.[3]?.[1]?.uri,
        thumbnail: data?.[3]?.[1]?.uri,
        created_at: toISOStringWithOffset(new Date()),
      }
      await queryClient.cancelQueries({ queryKey: ['images', newImage?.step, newImage?.os] })
      const previousImagesList = queryClient.getQueryData(['images', newImage?.step, newImage?.os])
      queryClient.setQueryData(['images', newImage?.step, newImage?.os], (oldImages) => [newImage, ...oldImages])
      return { previousImagesList }
    },
    onSuccess: (_response, formData) => {
      const data = formData?._parts
      const newImage = {
        os: data?.[0]?.[1],
        step: data?.[2]?.[1],
      }
      queryClient.invalidateQueries({ queryKey: ['images', newImage?.step, newImage?.os] });
    },
    onError: (_error, newImage, context) => {
      queryClient.setQueryData(['images', newImage?.step, newImage?.os], context?.previousImagesList)
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
