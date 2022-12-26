import React from 'react'
import './Login.scss'

function Login() {
    return (
        <div className='Auth-form-container'>
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
            </form>
            {/* <div className='Loginform'>
                <div className='Logintitle'>
                    <span className="text-regal-blue navbar-brand">Login</span>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" />
                </div>
            </div> */}
        </div>
    )
}

export default Login