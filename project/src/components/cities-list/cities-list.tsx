import {changeCityAction} from '../../store/action';
import {useAppDispatch} from '../../hooks/';

type CitiesListProps = {
  citiesList: string[];
  currentCity: string;
}

function CitiesList ({citiesList, currentCity}: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {
        citiesList.map((city) => (
          <li className="locations__item" key={city}>
            <a
              className={`locations__item-link tabs__item ${city === currentCity ? 'tabs__item--active' : ''}`}
              onClick={() => dispatch(changeCityAction(city))}
              href="#"
            >
              <span>{city}</span>
            </a>
          </li>
        ))
      }
    </ul>
  );
}

export default CitiesList;
