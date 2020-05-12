import React, {Component} from 'react';
import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from "../custom-buttom/custom-button.component";

import {signInWithGoogle} from '../../firebase/firebase.utils';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({email: '', password: ''});
    }

    handleChange = event => {
        const {name, value} = event.target.value;
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I have already an account</h2>
                <span>Sign in with your email and password</span>
                <form action="" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        label='Email'
                        value={this.state.email}
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        type="password"
                        name="password"
                        label='Password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        required
                    />
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton onClick={signInWithGoogle}> {' '}Sign In With Google {' '}</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignIn;