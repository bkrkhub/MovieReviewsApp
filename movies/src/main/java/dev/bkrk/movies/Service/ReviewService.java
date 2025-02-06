package dev.bkrk.movies.Service;

import dev.bkrk.movies.Model.Movie;
import dev.bkrk.movies.Model.Review;
import dev.bkrk.movies.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Review createReview(String reviewBody, String imdbId) {
        Review review = reviewRepository.insert(
                new Review(reviewBody, LocalDateTime.now(), LocalDateTime.now())
        );

        // Add Review ID to related Movie
        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbId").is(imdbId))
                .apply(new Update().push("reviewIds", review))
                .first();

        return review;
    }
}