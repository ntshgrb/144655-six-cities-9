import {useState, ChangeEvent, FormEvent} from 'react';
import {useDispatch} from 'react-redux';
import {postReviewAction} from '../../store/api-actions';
import {NewReview} from '../../types/new-review';
import {ReviewLength, REVIEW_RATE} from '../../const';
import ReviewRatingItem from '../review-rating-item/review-rating-item';

type ReviewFormProps = {
  id: number,
}

function ReviewForm({id}: ReviewFormProps): JSX.Element {
  const [textReview, setReview] = useState('');
  const [rate, setRateReview] = useState('');
  const dispatch = useDispatch();
  let buttonIsDisable = true;

  const textFieldChangeHandle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = event.target;
    setReview(value);

    if (value.length < ReviewLength.MinReviewLength) {
      event.target.setCustomValidity('Review is too short');
    } else if (value.length > ReviewLength.MaxReviewLength) {
      event.target.setCustomValidity('Review is too long');
    } else {
      event.target.setCustomValidity('');
    }
  };

  const rateChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setRateReview(value);
  };

  if (rate !== '' && ReviewLength.MinReviewLength < textReview.length && textReview.length < ReviewLength.MaxReviewLength) {
    buttonIsDisable = false;
  }

  const onSubmit = (data: NewReview) => dispatch(postReviewAction(data));

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit({offerId: id, comment: textReview, rating: +rate});
    setReview('');
    setRateReview('');
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="reviews__form form"
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          REVIEW_RATE.map((reviewItem) => (
            <ReviewRatingItem
              key={reviewItem.rating}
              rateChangeHandle={rateChangeHandle}
              rating={reviewItem}
              currentRate={rate}
            />))
        }
      </div>

      <textarea
        onChange={textFieldChangeHandle}
        className="reviews__textarea form__textarea"
        id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={textReview}
        minLength={ReviewLength.MinReviewLength}
        maxLength={ReviewLength.MaxReviewLength}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{ReviewLength.MinReviewLength} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={buttonIsDisable}
        >Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
