'use client';

import { useState } from "react";
import { auth, googleAuth, signInWithPopup, signInWithEmailAndPassword } from "../firebase/Firebase";

function Login() {
    const [pwd, setPwd] = useState('');
    const [email, setEmail] = useState('');

    // Function to handle Google login
    const googleClick = () => {
        signInWithPopup(auth, googleAuth)
            .then((result) => {
                alert(`Login Successful: ${result.user.email}`);
                window.location.href = '/homepage';
            })
            .catch((error) => {
                alert(`Error: ${error.message}`);
            });
    };

    // Function to handle email/password login
    const loginBtn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, pwd)
            .then((res) => {
                alert(`Login Successful: ${res.user.email}`);
                window.location.href = '/homepage';
            })
            .catch((error) => {
                console.error(error);
                alert(`Error: ${error.message}`);
            });
    };

    return (
        <div className="bg-slate-950 flex flex-col justify-center items-center h-[100vh] text-white">
            <h2 className="text-6xl font-semibold">Login to zoomNote</h2>

            {/* Placeholder for input field */}
            <input 
                type="text" 
                className="zoomInput shadow block w-full bg-slate-700 py-3 px-5 mt-5" 
                disabled 
            />

            <form className="w-[30%] mt-6 mb-2" onSubmit={loginBtn}>
                <div className="formContent mb-4">
                    <label htmlFor="email" className="text-[14px] pl-2 py-2">Email</label>
                    <input
                        className="block w-full bg-slate-700 py-4 px-5 text-[14px]"
                        style={{ border: '2px solid white' }}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        placeholder="Type in your correct email"
                        required 
                    />
                </div>
                
                <div className="formContent">
                    <label htmlFor="pwd" className="text-[14px] pl-2">Password</label>
                    <input 
                        className="block w-full bg-slate-700 py-4 px-5 text-[14px]"
                        style={{ border: '2px solid white' }}
                        type="password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        id="pwd"
                        placeholder="Please type in the correct password"
                        required 
                    />
                </div>

                <button type="submit" className="mt-5 text-center bg-slate-900 w-full py-4 rounded-[20px]">
                    Login
                </button>
                <a href="/" className="text-[14px] pl-3">Go back</a>
            </form>

            <button onClick={googleClick} className="my-1 text-center bg-slate-900 w-auto px-24 py-4 rounded-[20px]">
                Continue with Google
            </button>
            <a href="/signup" className="text-[12px] mt-2">Don't have an account?</a>
        </div>
    );
}

export default Login;
