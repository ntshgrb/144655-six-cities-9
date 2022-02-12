import Main from '../main/main';

type AppPlacesCountProps = {
  placesCount: number;
}

function App({placesCount}: AppPlacesCountProps): JSX.Element {
  return (
    <Main placesCount={placesCount} />
  );
}

export default App;
