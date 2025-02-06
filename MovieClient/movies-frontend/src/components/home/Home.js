import React, { useEffect } from 'react';
import MovieCarousel from '../movieCarousel/MovieCarousel';

const Home = ({ movies }) => {
  useEffect(() => {
    console.log("Ekrana gönderilen filmler:", movies);
  }, [movies]);

  return (
    <div>
      {movies.length > 0 ? <MovieCarousel movies={movies} /> : <p>No movies found</p>}
    </div>
  );
};

export default Home;
