import React from 'react';

import './form-text-area.styles.scss';

const FormTextAreaInput = ({handleChange, label, ...otherProps}) => {
    console.log(otherProps);
    return (
        <div className="group">
            <textarea className="form-text-area" onChange={handleChange} {...otherProps} />
            {
                label ?
                    (<label htmlFor="" className={`${otherProps.value.length ? 'shrink' : ''} form-text-area-label`}>
                        {label}
                    </label>)
                    :
                    null
            }
        </div>
    );
};

export default FormTextAreaInput;
