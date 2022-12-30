import React from 'react'
import './Userinfo.scss'
import firebase from '../firebase'
import { toast } from 'react-toastify';

const Userinfo = () => {
    const useruid = localStorage.getItem('useruid');
    const dbRef = firebase.database().ref();

    const logout = (e) => {
        e.preventDefault();
        if (window.confirm('確定要登出嗎')) {
            firebase.auth().signOut().then(() => {
                window.location.reload();
                localStorage.setItem('currentuser', '')
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    const success = () => {
        toast.success('用戶已刪除', {
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

    const error = () => {
        toast.error('無法刪除', {
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

    const deleteaccount = () => {
        const user = firebase.auth().currentUser;
        if (window.confirm('Are you sure you want to delete')) {
            dbRef.child(`Users/${useruid}`).remove((err) => {
                if (err) {
                    error();
                } else {
                    success();
                }
            })
            user.delete().then(() => {
                success();
            }).catch(() => {
                error();
            });
        }
    }

    const edit = () => {
        window.location.href = `/${useruid}/edit`
    }
    return (
        <div className='Userform'>
            <div className='Userlogoutbtn'>
                <button className='btn-danger' onClick={logout}>登出</button>
            </div>
            <div className='topusername'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <path fillRule="nonzero" d="M15 15v-.82c0-.52-.307-.993-.92-1.42-.52-.36-1.2-.647-2.04-.86-.747-.2-1.427-.3-2.04-.3s-1.293.1-2.04.3c-.84.213-1.52.5-2.04.86-.613.427-.92.9-.92 1.42V15h10zM10 5c-.44 0-.853.113-1.24.34a2.536 2.536 0 0 0-.92.92c-.227.387-.34.8-.34 1.24 0 .44.113.853.34 1.24.227.387.533.693.92.92.387.227.8.34 1.24.34.44 0 .853-.113 1.24-.34.387-.227.693-.533.92-.92.227-.387.34-.8.34-1.24 0-.44-.113-.853-.34-1.24a2.536 2.536 0 0 0-.92-.92C10.853 5.113 10.44 5 10 5zm5.82-2.5c.453 0 .847.167 1.18.5.333.333.5.727.5 1.18v11.64c0 .453-.167.847-.5 1.18-.333.333-.727.5-1.18.5H4.18c-.467 0-.863-.167-1.19-.5a1.63 1.63 0 0 1-.49-1.18V4.18c0-.453.163-.847.49-1.18.327-.333.723-.5 1.19-.5H5V.82h1.68V2.5h6.64V.82H15V2.5h.82z"></path>
                </svg>
                {localStorage.getItem('currentusername')}
            </div>
            <div className='sectiontitle'>
                <i className="fa fa-pencil" aria-hidden="true"></i>
                會員資料
            </div>
            <div className='infocontainer'>
                <div className='infolabel'>Email : </div>
                <div className='infospan'>
                    {localStorage.getItem('currentuseremail')}
                </div>
            </div>
            <div className='infocontainer'>
                <div className='infolabel'>姓名 : </div>
                <div className='infospan'>
                    {localStorage.getItem('currentusername')}
                </div>
            </div>
            <div className='infocontainer'>
                <div className='infolabel'>生日 : </div>
                <div className='infospan'>
                    {localStorage.getItem('currentuserbirthday')}
                </div>
            </div>
            <div className='infocontainer'>
                <div className='infolabel'>手機號碼 : </div>
                <div className='infospan'>
                    {localStorage.getItem('currentuserphonenumber')}
                </div>
            </div>
            <div className='infocontainer'>
                <div className='infolabel'>寄件地址 : </div>
                <div className='infospan'>
                    {localStorage.getItem('currentuseraddress')}
                </div>
            </div>

            <div className='Userinfobtn'>
                <button className='btn-danger' onClick={deleteaccount}>刪除帳號</button>
                <button className='btn-primary' onClick={edit}>更新會員資料</button>
            </div>
        </div>
    )
}

export default Userinfo