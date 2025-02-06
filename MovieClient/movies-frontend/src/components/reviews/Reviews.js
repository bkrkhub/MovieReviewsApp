import { useEffect, useRef } from "react";
import api from '../../api/axiosConfig';
import { useParams } from "react-router-dom";
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from "../reviewForm/ReviewForm";

import React from 'react'

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);

    },[movieId]);

    const addReview = async (e) => {
        e.preventDefault(); 
        const rev = revText.current;
    
        try {
            const response = await api.post("/api/post/reviews", {
                reviewBody: rev.value,
                imdbId: movieId
            });
    
            const newReview = response.data;
            const updatedReviews = [...reviews, newReview];
    
            rev.value = "";
            setReviews(updatedReviews);
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <Container>
        <Row>
            <Col><h1>Reviews</h1></Col>
        </Row>
        <Row className="mt-2">
            <Col>
            <img 
                src={movie?.poster} 
                alt="Movie Poster" 
                style={{
                    width: "100%",
                    maxWidth: "350px",
                    height: "auto", 
                    display: "block",
                    margin: "0 auto"     
                }} 
            />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr/>
                            </Col>
                        </Row>                    
                    </>
                }
                {
                    reviews?.map((r) => {
                        return(
                            <>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr/>
                                    </Col>
                                </Row>
                            </>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>
    </Container>
  )
}

export default Reviews