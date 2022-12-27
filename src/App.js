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
      const dbRef = firebase.database().ref();
      dbRef.child("Users").child(user.uid).get().then((snapshot) => {
        if (snapshot.exists()) {
          localStorage.setItem('currentusername', snapshot.val().username)
          localStorage.setItem('currentuseremail', snapshot.val().email)
          localStorage.setItem('currentuserbirthday', snapshot.val().birthday)
        } else {
          localStorage.setItem('currentusername', '')
          localStorage.setItem('currentuseremail', '')
          localStorage.setItem('currentuserbirthday', '')
        }
      }).catch((error) => {
        console.error(error);
      });
      // 
    } else {
      localStorage.setItem('currentusername', '')
      localStorage.setItem('currentuseremail', '')
      localStorage.setItem('currentuserbirthday', '')
    }
  });
  const user = localStorage.getItem('currentuser');

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <UserContext.Provider value={user}>
            <Navbar />
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
