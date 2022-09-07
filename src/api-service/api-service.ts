const API_KEY = '25942332-704865a59830ef544b91ef743';

export const fetchImages = async (query: string, page = 1) => {
  const request = await fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (request.ok) {
    return request.json();
  } else {
    await Promise.reject(
      new Error(`Can't fetch ${query}, try once more or adjust your search`)
    );
  }
};
