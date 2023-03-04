import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LogedUser } from './redux/actions/acountActions';
import { fetchEntities } from './redux/actions/entitiesActions';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Map from './pages/Map';
import Service from './pages/Service';
import Entities from './pages/Entities';
import EntitieDetail from '../src/pages/EntitieDetail';
import SingUpEntitie from './pages/signUpEntities/SingUpEntitie';
import Login from './Components/Login';
import UserProfile from './pages/userProfile/UserProfile';
import EntityProfile from './pages/entityProfile/EntityProfile';
import Dashboard from './pages/Dashboard/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact/Contact';
import Navbar from './Components/NavBar';
import SingUp from './pages/SingUp';
import ColorModeSwitcher from './Components/ColorModeSwitcher';
import Footer from './Components/Footer';
import ChatBox from './components/ChatBox';
import { useSelector } from 'react-redux';

const App = () => {
  const { acount } = useSelector((state) => state.acountReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    !Object.keys(acount).length && dispatch(LogedUser());
    dispatch(fetchEntities());
  }, []);

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
        <Route path="/login/:googleId" element={<Login />} />
        <Route path="/singup" element={<SingUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/entityprofile" element={<EntityProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <ChatBox />
      <ColorModeSwitcher />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
