import React, {useState} from 'react';

import FormInput from "../../components/form-input/form-input.component";
import FormTextAreaInput from "../../components/form-text-area/form-text-area.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import './contact.styles.scss';

const ContactPage = () => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const handleChangeSubject = event => {
        const {value} = event.target;
        setSubject(value)
    };

    const handleChangeContent = event => {
        const {value} = event.target;
        setContent(value)
    };

    return (
        <div className="contact-page">
            <h1 className='title'>Contact me</h1>
            <form onSubmit={handleSubmit} className="form-contact">
                <FormInput
                    name="subject"
                    label='Subject'
                    value={subject}
                    handleChange={handleChangeSubject}
                    required
                />
                <FormTextAreaInput
                    name="content"
                    label='Content'
                    value={content}
                    rows={10}
                    handleChange={handleChangeContent}
                    required
                />
                <div className="buttons">
                    <CustomButton type="submit">Send</CustomButton>
                </div>
            </form>
        </div>
    );
};

export default ContactPage;
