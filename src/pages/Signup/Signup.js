import React from 'react'
import { Link } from 'react-router-dom'
import './Signup.scss'
import firebase from '../firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Signup extends React.Component {

    constructor(props) {
        super(props)
        this.Signup = this.Signup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: "",
            password: ""
        }
    }

    success = ({ history }) => {
        toast.success('註冊成功', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        history.push("/")
    };

    error = () => {
        toast.error('帳號已存在', {
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

    Signup(e) {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
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
            <div className='Signupcontainer'>
                <div className='Signupform'>
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
                    <div className='text-regal-blue fs-25 fw-7 Signuptitle'>註冊</div>
                    <div className='Signupinputcontainer'>
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
                    <div className='Signupinputcontainer'>
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
                    <div className='Signupbtn'>
                        <button className="btn-primary"
                            onClick={this.Signup}
                            type="submit">註冊</button>
                    </div>
                    <div className='Signupforgotpassword'>
                        <span>忘記密碼? <Link to="/forgotpassword" className='text-red fw-7'>點這裡</Link></span>
                    </div>
                    <div className='Signupforgotpassword'>
                        <span>已經有帳號了 ? </span><Link to="/login" className='text-red fw-7'>登入</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;