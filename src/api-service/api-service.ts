const API_KEY = '25942332-704865a59830ef544b91ef743';

export const fetchImages = async (query = 'image', page = 1) => {
  const request = await fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return await request.json();
};
