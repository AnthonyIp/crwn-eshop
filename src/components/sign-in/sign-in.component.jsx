import React, {useState} from 'react';
import {connect} from 'react-redux';
import FormInput from '../form-input/form-input.component';

import CustomButton from "../custom-button/custom-button.component";
import {emailSignInStart, googleSignInStart} from "../../redux/user/user.actions";

import './sign-in.styles.scss';

const SignIn = ({emailSignInStart}) => {

    const [userCredentials, setCredentials] = useState({email: '', password: ''});
    const {email, password} = userCredentials;

    const handleSubmit = async (event) => {
        event.preventDefault();
        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const {name, value} = event.target;
        // this.setState({[name]: value});
        setCredentials({...userCredentials, [name]: value});
    }
    return (
        <div className='sign-in'>
            <h2>I have already an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type="email"
                    name="email"
                    label='Email'
                    value={email}
                    handleChange={handleChange}
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    label='Password'
                    value={password}
                    handleChange={handleChange}
                    required
                />
                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Sign In With
                                                                                           Google </CustomButton>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);
