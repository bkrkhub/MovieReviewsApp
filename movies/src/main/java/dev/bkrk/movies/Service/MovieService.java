package dev.bkrk.movies.Service;

import dev.bkrk.movies.Model.Movie;
import dev.bkrk.movies.Model.Review;
import dev.bkrk.movies.Repository.MovieRepository;
import dev.bkrk.movies.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Movie> findAllMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> findMovieById(String imdbId) {
        Optional<Movie> movieOptional = movieRepository.findMovieByImdbId(imdbId);

        if (movieOptional.isPresent()) {
            Movie movie = movieOptional.get();

            // If reviewIds is empty, take the reviews and set them to movie.
            if (movie.getReviewIds() != null && !movie.getReviewIds().isEmpty()) {
                List<Review> reviews = reviewRepository.findAllById(
                        movie.getReviewIds().stream()
                                .map(Review::getId)
                                .collect(Collectors.toList())
                );
                movie.setReviewIds(reviews);
            }

            return Optional.of(movie);
        }
        return Optional.empty();
    }

}
