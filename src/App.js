import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Banner from './Components/Banner';
import Popular from './Components/PolularMovie';
import NowPlaying from './Components/NowPlaying';
import UpComing from './Components/Upcoming';
import Footer from './Components/Footer';
import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App;
