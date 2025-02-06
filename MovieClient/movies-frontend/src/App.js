import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/404notFound/NotFound';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  // Function to retrieve movies from API
  const getMovies = async () => {
    try {
      const response = await api.get("/api/get/movies");
      setMovies(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    console.log("Güncellenen filmler:", movies);
  }, [movies]);


  const getMovieData = async (movieId) => {
    try {
        const response = await api.get(`/api/get/movies/${movieId}`);

        const singleMovie = response.data;
        setMovie(singleMovie);
        setReviews(singleMovie.reviewIds || []);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="App">
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <>
          {/* Header component */}
          <Header />
          {/* Route definitions */}
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home movies={movies} />} />
              <Route path = "/Trailer/:ytTrailerId" element = {<Trailer/>}></Route>
              <Route path="/Reviews/:movieId" element = {<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>}> </Route>
              <Route path="*" element = {<NotFound/>} />
            </Route>
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
