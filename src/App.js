import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// pages
import { Home, Category, Cart } from "./pages/index";
// components
import Navbar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";
import { Provider } from 'react-redux';
import store from "./store/store";
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { UserContext } from './UserContext';
import firebase from './pages/firebase';

function App() {

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      localStorage.setItem('currentuser', user.email)
    } else {
      localStorage.setItem('currentuser', '')
    }
  });
  const user = localStorage.getItem('currentuser');

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <UserContext.Provider value={user}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:id" element={<Category />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </UserContext.Provider>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
