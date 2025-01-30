import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import axios from '../api';

const fetchImages = async (step, os) => {
  if (step && os) {
    const response = await axios.get('/images', {
      params: { step, os, },
    });
    return response?.data;
  }
};

const useImages = ({ step, os }) => {
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();

  const { data, isError, isLoading: isLoadingImgs } = useQuery({
    queryKey: ['images', step, os],
    queryFn: async () => fetchImages(step?.toUpperCase(), os),
    enabled: !!step && !!os,
  });

  const deleteImg = async (imgId) => {
    const response = await axios.delete(`/images/${imgId}`);
    return response.data;
  }

  const { mutate: deleteImage, isLoading: isDeleting} = useMutation({
    mutationFn: deleteImg,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
    onError: (error) => {
      setError('Erro ao deletar a foto. Tente novamente e se persistir, entre em contato com o Administrador.');
    },
  });

  return ({
    images: data,
    isError,
    error,
    deleteImage,
    isDeleting,
    isLoadingImgs,
  })
};

export default useImages;
