import React, { useEffect, useState } from 'react';
import './MovieCarousel.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const MovieCarousel = ({ movies }) => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);

    function reviews(movieId) {
        navigate(`/Reviews/${movieId}`);
    }

    useEffect(() => {
      console.log("Carousel içindeki filmler:", movies.length);
      movies.forEach((movie, index) => {
          console.log(`Film ${index + 1}:`, movie.title);
      });
    }, [movies]);
  

    return (
        <div className='movie-carousel-container'>
            <Carousel 
                autoPlay={false} 
                navButtonsAlwaysVisible={true} 
                swipe={true} 
                indicators={true} 
                fullHeightHover={false}
                onChange={(now) => setActiveIndex(now)}
            >
                {movies && movies.length > 0 ? (
                    movies.map((movie, index) => {
                        console.log(`Film: ${movie.title}, imdbId: ${movie.imdbId}, trailer: ${movie.trailerLink}`);

                        return (
                            <Paper key={movie.imdbId || index} className='movie-card-container'>
                                <div
                                    className='movie-card'
                                    style={{
                                        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url(${movie.backdrops?.[0] || movie.poster})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "top center",
                                        backgroundRepeat: "no-repeat",
                                        width: "100%",
                                        height: "100vh",
                                    }}
                                >
                                    <div className='movie-detail'>
                                        <div className='movie-poster'>
                                            <img src={movie.poster} alt={movie.title} />
                                        </div>
                                        <div className='movie-title'>
                                            <h4>{movie.title}</h4>
                                        </div>
                                        <div className={`movie-buttons-container ${activeIndex === index ? "visible" : "hidden"}`}>
                                            
                                            {/* 🎬 YouTube Trailer Button */}
                                            {movie.trailerLink ? (
                                                <Link to={`/Trailer/${movie.trailerLink.split("v=")[1] || ""}`}>
                                                    <div className='play-button-icon-container'>
                                                        <FontAwesomeIcon className='play-button-icon' icon={faYoutube} />
                                                    </div>
                                                </Link>
                                            ) : (
                                                <p className="text-muted">Trailer Yok</p>
                                            )}

                                            {/*Review Button */}
                                            {movie.imdbId ? (
                                                <div className="movie-review-button-container">
                                                    <Button
                                                        className="btn btn-warning review-button"
                                                        onClick={() => reviews(movie.imdbId)}
                                                    >
                                                        <FontAwesomeIcon className="review-icon" icon={faComment} /> Reviews
                                                    </Button>
                                                </div>
                                            ) : (
                                                <p className="text-muted">Reviews Yok</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        );
                    })
                ) : (
                    <p>Loading movies...</p>
                )}
            </Carousel>
        </div>
    );
};

export default MovieCarousel;
