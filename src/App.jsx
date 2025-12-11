import { Outlet } from 'react-router';
import Header from './Header';

function App(props) {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
