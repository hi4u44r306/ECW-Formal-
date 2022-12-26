// import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAX3oEgGNDNWy2JEnf8t_8UFgvsdVDNU04",
    authDomain: "sunnyvictorshop.firebaseapp.com",
    projectId: "sunnyvictorshop",
    storageBucket: "sunnyvictorshop.appspot.com",
    messagingSenderId: "707438463341",
    appId: "1:707438463341:web:bc77936f7c4c5b3be73264",
    measurementId: "G-G86275VHJ4"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
