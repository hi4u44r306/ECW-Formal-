import React from 'react'
// import { Link } from 'react-router-dom'
import './Edit.scss'
import firebase from "../firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Edit extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: "",
            username: "",
        }
    }

    componentDidMount() {
        const useruid = localStorage.getItem('useruid');
        const dbRef = firebase.database().ref();
        dbRef.child("Users").child(useruid).get().then((snapshot) => {
            this.setState({ ...snapshot.val() })
        }).catch(() => {
            this.setState({})
        });
    }

    success = () => {
        toast.success('登入成功', {
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
        alert("Update")
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className='Editcontainer'>
                <div className='Loginform'>
                    <div className='Logininputcontainer'>
                        <label>帳號 / Email</label>
                        <input name='email' value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className='Logininputcontainer'>
                        <label>用戶名稱 / UserName</label>
                        <input name='username' value={this.state.username} onChange={this.handleChange} />
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
