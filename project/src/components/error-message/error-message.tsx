import './error-message.css';
import {useAppSelector} from '../../hooks';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector((state) => state.UTILITY.error);

  if (error) {
    return (
      <div
        className="error-message"
      >
        {error}
      </div>
    );
  }

  return null;
}

export default ErrorMessage;
