import MainScreen from '../main-screen/main-screen';

type AppPlacesCountProps = {
  placesCount: number;
}

function App({placesCount}: AppPlacesCountProps): JSX.Element {
  return (
    <MainScreen placesCount={placesCount} />
  );
}

export default App;
