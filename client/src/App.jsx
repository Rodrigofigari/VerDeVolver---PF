import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Map from './pages/Map';
import Service from './pages/Service';
import Entities from './pages/Entities';
import EntitieDetail from '../src/pages/EntitieDetail';
import SingUpEntitie from './pages/SignUpEntities/SingUpEntitie';
import Login from './Components/Login';
import UserProfile from './pages/user profile/UserProfile';
import EntityProfile from './pages/entity profile/EntityProfile';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './Components/NavBar';
import SingUp from './pages/SingUp';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { getEntities } from './redux/actions/entitiesActions';
import ColorModeSwitcher from './Components/ColorModeSwitcher';

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getEntities());
  // }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/services" element={<Service />} />
        <Route path="/entities" element={<Entities />} />
        <Route path="/entitie/:id" element={<EntitieDetail />} />
        <Route path="/beVdV" element={<SingUpEntitie />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<SingUp />} />
        <Route path="/userprofile/:id" element={<UserProfile />} />
        <Route path="/entityprofile/:id" element={<EntityProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <ColorModeSwitcher />
    </BrowserRouter>
  );
};

export default App;
