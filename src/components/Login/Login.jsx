import React, { useRef, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { Link } from 'react-router-dom';

const Login = () => {

    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');
    const emailRef = useRef(null);

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        // Reset login and error messages
        setLoginError('');
        setLoginSuccess('');

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
               if(user.emailVerified){
                setLoginSuccess("Login successful");
               }
              else{
                alert('please verify your email address')
              }
            })
            .catch((error) => {
                setLoginError(error.message);
            });
    };

    const handleForgetPassword = () => {
        const email = emailRef.current?.value;

        if (!email) {
            console.log("Please enter your email to reset the password.");
            return;
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            console.log("Please enter a valid email.");
            return;
        }

        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Please check your email for reset instructions.");
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                name='email'
                                ref={emailRef}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                            <p>New to this website? Please <Link className='text-blue-800' to='/register'>Register</Link></p>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {loginError && <p className='text-red-500 text-2xl'>{loginError}</p>}
                    {loginSuccess && <p className='text-green-600 text-2xl'>{loginSuccess}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;
