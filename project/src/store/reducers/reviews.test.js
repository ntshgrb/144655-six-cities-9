import {reviews} from './reviews';
import {makeFakeReview} from '../../utils/mocks';
import {loadReviews, sendReviews} from './reviews';

const reviewsList = new Array(3).fill(null).map(() => makeFakeReview());
const updatedReviewsList = new Array(4).fill(null).map(() => makeFakeReview());

describe('Reducer: reviews', () => {
  it('without additional parameters should return initial state', () => {
    expect(reviews.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({currenOfferReviews: []});
  });

  it('should update reviews by load reviews', () => {
    const state = {currenOfferReviews: []};
    expect(reviews.reducer(state, loadReviews(reviewsList)))
      .toEqual({currenOfferReviews: reviewsList});
  });
  it('should update reviews after sending new review', () => {
    const state = {currenOfferReviews: reviewsList};
    expect(reviews.reducer(state, sendReviews(updatedReviewsList)))
      .toEqual({currenOfferReviews: updatedReviewsList});
  });
});
