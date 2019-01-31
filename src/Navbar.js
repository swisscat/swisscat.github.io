import React, { Component } from 'react';
class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#" onClick={this.props.navigateTo('')}>Geo Trainer</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav mr-auto">
                        <a className="nav-item nav-link" href="#" onClick={this.props.navigateTo('quizz')}>Quizz</a>
                        <a className="nav-item nav-link" href="#" onClick={this.props.navigateTo('data')}>Database</a>
                    </div>

                    <span className="navbar-text">
                        v{this.props.version}
                    </span>
                </div>
            </nav>
        )
    }
}

export default Navbar;