import { Outlet } from 'react-router';
import Header from './components/Header';

function App(props) {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
