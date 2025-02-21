import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient()

  const { data, isPending: isLoadingImgs } = useQuery({
    queryKey: ['images', step, os],
    queryFn: async () => fetchImages(step?.toUpperCase(), os),
    enabled: !!step && !!os,
    onError: (error) => console.error('Erro ao recuperar imagens', error)
  });

  const deleteImage = async ({id}) => {
    const response = await axios.delete(`/images/${id}/?step=${step}&os=${os}`);
    return response.data;
  };

  const { mutate: deleteImg, isPending: isPendingDelete } = useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      queryClient.invalidateQueries(["images"]);
    },
    onError: (error) => {
      console.error("Erro ao deletar imagem:", error);
    }
  });

  return ({
    images: data,
    isLoadingImgs,
    deleteImg,
    isPendingDelete 
  })
};

export default useImages;
