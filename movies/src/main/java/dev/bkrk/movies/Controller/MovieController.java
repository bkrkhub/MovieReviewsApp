package dev.bkrk.movies.Controller;

import dev.bkrk.movies.Model.Movie;
import dev.bkrk.movies.Service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// CrossOrigin for communicate with the front-end
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/get/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping
    public ResponseEntity<List<Movie>> getMovies() {
        return new ResponseEntity<List<Movie>>(movieService.findAllMovies(), HttpStatus.OK);
    }

    @GetMapping("/{imdbId}")
    public ResponseEntity<Movie> getMovieWithReviewDetails(@PathVariable String imdbId) {
        Optional<Movie> movieOptional = movieService.findMovieById(imdbId);

        if (movieOptional.isPresent()) {
            return ResponseEntity.ok(movieOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
