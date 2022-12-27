import React from 'react'
import { Link } from 'react-router-dom'
import './Login.scss'
import firebase from "../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Userinfo from '../Userinfo/Userinfo';

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: "",
            password: "",
            currentuser: ""
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.currentuser = user.email;
            } else {
                // User is signed out
                // ...
            }
        });
    }

    success = () => {
        toast.success('🦄 登入成功', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        window.location.href = "/";
    };

    error = () => {
        toast.error('帳號密碼錯誤', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    login(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.success();
            }).catch(() => {
                this.error();
            })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className='Logincontainer'>

                {
                    localStorage.getItem('currentusername') !== '' ?
                        <Userinfo />
                        :
                        <div className='Loginform'>
                            <ToastContainer
                                position="top-center"
                                autoClose={2000}
                                limit={1}
                                hideProgressBar={false}
                                newestOnTop
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover={false}
                                theme="light"
                            />
                            <div className='text-regal-blue fs-25 fw-7 Logintitle'>登入</div>
                            <div className='Logininputcontainer'>
                                <label>帳號 / Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    id="email"
                                    placeholder="輸入電子郵件或帳號..."
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                />
                            </div>
                            <div className='Logininputcontainer'>
                                <label>密碼 / Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    id="password"
                                    placeholder="輸入密碼..."
                                    onChange={this.handleChange}
                                    onKeyPress={this.handleKeypress}
                                    value={this.state.password}
                                />
                            </div>
                            <div className='Loginbtn'>
                                <button className="btn-primary"
                                    onClick={this.login}
                                    type="submit">登入</button>
                            </div>
                            <div className='Loginforgotpassword'>
                                <span>忘記密碼? <Link to="/forgotpassword" className='text-red fw-7'>點這裡</Link></span>
                            </div>
                            <div className='Loginforgotpassword'>
                                <span>還沒有帳號嗎 ? </span><Link to="/signup" className='text-red fw-7'>註冊</Link>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default Login;