import {ChangeEvent} from 'react';
import {useAppSelector} from '../../hooks';

type ReviewRatingItemProps = {
  rateChangeHandle: (event: ChangeEvent<HTMLInputElement>) => void,
  rating: {
    value: number,
    rating: string,
  },
  currentRate: string,
}

function ReviewRatingItem({rateChangeHandle, rating, currentRate}: ReviewRatingItemProps): JSX.Element {
  const loadingStatus = useAppSelector((state) => state.REVIEWS.reviewIsSending);

  const isChecked = +currentRate === rating.value;
  return (
    <>
      <input
        onChange={rateChangeHandle}
        className="form__rating-input visually-hidden"
        name="rating"
        value={rating.value}
        id={`${rating.value}-stars`}
        type="radio"
        checked={isChecked}
        disabled={loadingStatus}
      />
      <label
        htmlFor={`${rating.value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={rating.rating}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default ReviewRatingItem;
