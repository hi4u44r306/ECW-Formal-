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
import SearchPage from './pages/SearchPage/SearchPage';
import EditPage from './pages/EditPage/EditPage';

function App() {



  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const dbRef = firebase.database().ref();
      dbRef.child("Users").child(user.uid).get().then((snapshot) => {
        if (snapshot.exists()) {
          localStorage.setItem("useruid", user.uid);
          localStorage.setItem('currentusername', snapshot.val().username)
          localStorage.setItem('currentuseremail', snapshot.val().email)
          localStorage.setItem('currentuserbirthday', snapshot.val().birthday)
          localStorage.setItem('currentuserphonenumber', snapshot.val().phonenumber)
        } else {
          localStorage.setItem("useruid", '');
          localStorage.setItem('currentusername', '')
          localStorage.setItem('currentuseremail', '')
          localStorage.setItem('currentuserbirthday', '')
          localStorage.setItem('currentuserphonenumber', '')
        }
      }).catch((error) => {
        console.error(error);
      });
      // 
    } else {
      localStorage.setItem("useruid", '');
      localStorage.setItem('currentusername', '')
      localStorage.setItem('currentuseremail', '')
      localStorage.setItem('currentuserbirthday', '')
      localStorage.setItem('currentuserphonenumber', '')
    }
  });
  const user = localStorage.getItem('currentuser');
  const useruid = localStorage.getItem('useruid');

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
              <Route path={`/${useruid}/edit`} element={<EditPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="category/search" element={<SearchPage />} />
            </Routes>
          </UserContext.Provider>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
