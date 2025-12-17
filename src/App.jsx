import { Outlet } from 'react-router';
import Header from './components/Header';
import Main from './components/Main';

function App(props) {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default App;
