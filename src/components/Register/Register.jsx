import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebase/firebase.config';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Register = () => {

  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.checkbox.checked;
    console.log(email, password, accepted)


    // reset error
    setRegisterError('');

    // reset success
    setRegisterSuccess('');

    if (password.length < 8) {
      setRegisterError('oops! Password Should be at least 8 characters or longer please try again');
      return;
    }
    else if (!/[A-Z]/.test(password)) {
      setRegisterError('try another password ');
      return;

    }
    else if (!accepted) {
      setRegisterError('please accept our terms & conditions')
      return;
    }



    // create user

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user)
        setRegisterSuccess('User created Successfully.')

        // update profile
        updateProfile(user,{
          displayName:name,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(() => {
          // Profile updated!
          alert('profile updated');
        }).catch((error) => {
          // An error occurred
          alert('something wrong');
        });

        // send verification email
        sendEmailVerification(user)
          .then(() => {
            alert('please check your email for verify your account');
          })

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setRegisterError(errorMessage);
        // ..
      });
  }

  return (
    <div>
      <div className='mx-auto md:w-1/2'>
        <h1 className='text-green-300 text-3xl'>Please register</h1>
        <form onSubmit={handleRegister}>
          <input
            type="name"
            name="name"
            placeholder="Your Name"
            required
            className="input input-bordered input-primary w-full mt-5" /> <br />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="input input-bordered input-primary w-full mt-5" /> <br />

          <div className='mb-4 relative'>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Your password"
              required
              className="input input-bordered input-primary w-full mt-5" /><span className='absolute top-1/2 right-2  ' onClick={() => setShowPassword(!showPassword)}>
              {
                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
              }
            </span>
          </div>
          <br />
          <input
            type="checkbox"
            id='terms'
            name='checkbox'
            defaultChecked
            className="checkbox border-orange-400 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange] checked:border-indigo-800" />
          <label className='ml-2 mb-4' htmlFor="terms">Accept our <a href="">Terms & Conditions</a></label>
          <button className="btn btn-outline w-full btn-secondary">Register</button>

          <p>Already have an account? then<Link className='text text-green-600' to='/login'>Login</Link></p>
        </form>
        {
          registerError && <p className='text-2xl text-red-600'>{registerError}</p>
        }

        {
          registerSuccess && <p className='text-2xl text-green-600'>{registerSuccess}</p>
        }
      </div>
    </div>
  );
};

export default Register;