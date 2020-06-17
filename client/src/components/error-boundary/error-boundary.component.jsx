import React, {Component} from 'react';

import './error-boundary.styles.scss';

class ErrorBoundary extends Component {
    constructor() {
        super();

        this.state = {
            hasErrored: false
        }
    }

    static getDerivedStateFromError(error) {
        // Process the error
        return {hasErrored: true};
    }

    componentDidCatch(error, errorInfo) {
        console.log(error);
    }

    render() {
        if (this.state.hasErrored) {
            return (
                <div className="error-boundary">
                    <div className="error-image-container" />
                    <h2 className="error-image-text">Sorry this page is broken</h2>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
