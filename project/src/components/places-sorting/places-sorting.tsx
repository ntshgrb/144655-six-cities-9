import {SortingTypes} from '../../const';
import {useState} from 'react';

type PlacesSortingProps = {
  handleSortingChange: (sortType: string) => void,
  placesSorting: string | null,
}

function PlacesSorting ({handleSortingChange, placesSorting}: PlacesSortingProps): JSX.Element {
  const isSortingTypeActive = (currentType: string) => placesSorting === currentType;

  const [listIsActive, setListActive] = useState(false);

  const toggleListState = () => {
    setListActive(!listIsActive);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        onClick={toggleListState}
        className="places__sorting-type"
        tabIndex={0}
      >
        {placesSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul
        className={`places__options places__options--custom ${listIsActive ? 'places__options--opened' : ''}`}
      >
        {
          Object.values(SortingTypes).map((type) => (
            <li
              key={type}
              onClick={() => {
                handleSortingChange(type);
                toggleListState();
              }}
              className={`places__option ${isSortingTypeActive(type) ? 'places__option--active' : ''}`}
              tabIndex={0}
            >{type}
            </li>))
        }
      </ul>
    </form>
  );
}

export default PlacesSorting;
