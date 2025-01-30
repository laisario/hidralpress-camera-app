import { useQuery } from '@tanstack/react-query';
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

  const { data, isError, isPending: isLoadingImgs } = useQuery({
    queryKey: ['images', step, os],
    queryFn: async () => fetchImages(step?.toUpperCase(), os),
    enabled: !!step && !!os,
  });


  return ({
    images: data,
    isError,
    error,
    isLoadingImgs,
  })
};

export default useImages;
