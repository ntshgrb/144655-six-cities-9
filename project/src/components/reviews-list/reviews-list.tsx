import ReviewsItem from '../reviews-item/reviews-item';
import {Review} from '../../types/review';
import {MAX_REVIEWS_COUNT} from '../../const';
import {sortReviews} from '../../utils/utils';

type ReviewsListProps = {
  reviews: Review[];
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  let sortedReviews = [...reviews];

  if (sortedReviews.length > 0) {
    sortedReviews = sortReviews(sortedReviews);
  } else if (sortedReviews.length > MAX_REVIEWS_COUNT) {
    reviews = reviews.slice(0, MAX_REVIEWS_COUNT);
  }

  return (
    <ul className="reviews__list">
      {
        sortedReviews.map( (review) => (
          <ReviewsItem
            key={review.id}
            review={review}
          />))
      }
    </ul>
  );
}

export default ReviewsList;
