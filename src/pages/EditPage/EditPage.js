import React from 'react'
// import { Link } from 'react-router-dom'
import './Edit.scss'
import firebase from "../firebase";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScaleLoader from "react-spinners/ScaleLoader";


class Edit extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            loading: true,
            username: "",
            phonenumber: "",
            address: "",
        }
    }
    useruid = localStorage.getItem('useruid');
    dbRef = firebase.database().ref();

    componentDidMount() {
        this.dbRef.child("Users").child(this.useruid).get().then((snapshot) => {
            this.setState({ ...snapshot.val() })
        }).catch(() => {
            this.setState({})
        });
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000);
    }

    success = () => {
        toast.success('修改成功', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setTimeout(() => { window.location.href = "/login"; }, 1000)
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

    update = () => {
        this.dbRef.child("Users").child(this.useruid).update({
            username: this.state.username,
            address: this.state.address,
            phonenumber: this.state.phonenumber,
        }).then(() => {
            localStorage.setItem("currentusername", this.state.username);
            localStorage.setItem('currentuserphonenumber', this.state.phonenumber)
            localStorage.setItem('currentuseraddress', this.state.address)
            this.success();
            setTimeout(() => {
                window.location.href = "/login"
            }, 1000);
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
            <div className='Editcontainer'>
                <ToastContainer />
                <div className='Loginform'>
                    <div className='Logininputcontainer'>
                        <label>用戶名稱 / UserName</label>
                        {
                            this.state.loading ?
                                <ScaleLoader
                                    loading={this.loading}
                                    color="hsla(209, 100%, 69%, 1)"
                                    height={25}
                                />
                                :
                                <input name='username' value={this.state.username} onChange={this.handleChange} />
                        }
                    </div>
                    <div className='Logininputcontainer'>
                        <label>電話號碼 / Phonenumber</label>
                        {
                            this.state.loading ?
                                <ScaleLoader
                                    loading={this.loading}
                                    color="hsla(209, 100%, 69%, 1)"
                                    height={25}
                                />
                                :
                                <input name='phonenumber' pattern="[0-9]{4}[0-9]{3}[0-9]{3}" maxLength={10} value={this.state.phonenumber} onChange={this.handleChange} />
                        }

                    </div>
                    <div className='Logininputcontainer'>
                        <label>寄件地址 / Address</label>
                        {
                            this.state.loading ?
                                <ScaleLoader
                                    loading={this.loading}
                                    color="hsla(209, 100%, 69%, 1)"
                                    height={25}
                                />
                                :
                                <input name='address' value={this.state.address} onChange={this.handleChange} />
                        }

                    </div>
                    <div className='Loginbtn'>
                        <button className="btn-primary"
                            onClick={this.update}
                            type="submit">更新資料</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;
