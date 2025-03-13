import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '../api';

const fetchImages = async (step, os) => {
  if (step && os) {
    const response = await axios.get('/get-content/', {
      params: { step, os },
    });
    return response?.data;
  }
};

const useContent = ({ step, os }) => {
  const { data, isPending: isLoadingImgs } = useQuery({
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    queryKey: ['content', {step}, {os}],
    queryFn: async () => fetchImages(step?.toUpperCase(), os),
    enabled: !!step && !!os,
    onError: (error) => console.error('Erro ao recuperar imagens, achar', error)
  });

  return ({
    content: data,
    isLoadingImgs,
  })
};

export default useContent;
