"use client";

import React, { useState } from 'react'
import LoginForm from './Signin/SigninForm';
import SignUpPage from './Signup/SignupForm';

export default function AuthPage() {
    const [isSignIn, setIsSignIn] = useState(true)
  return (
    isSignIn ? (
        <LoginForm onSignUpClick={() => setIsSignIn(false)} />
      ) : (
        <SignUpPage onSignInClick={() => setIsSignIn(true)} />
      )
  )
}


