import React, { Component } from 'react';
import Quizz from "./Quizz";
import Navbar from "./Navbar";
import Data from "./Data";
import mockData from './mock';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mock: true,
            version: '0.1',
            loaded: false,
            error: null,
            countries: [],
            questions: [
                'capital', 'name', 'population'
            ],
            navigation: null,
        };
    }

    apiCall(api) {
        if (this.state.mock) {
            return new Promise((resolve, reject) => {
                if (typeof mockData[api] !== "undefined")
                    resolve(mockData[api]);
                else
                    reject('No mock for ' + api);
            });
        } else {
            return fetch(api)
                .then(res => res.json())
        }
    }

    componentDidMount() {
        this.apiCall("https://restcountries.eu/rest/v2/all")
            .then((countries) => {
                    this.setState({
                        loaded: true,
                        countries: countries.map((country) => {
                            country.names = [country.name].concat(country.altSpellings.filter(name => name.length > 2));

                            return country;
                        })
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error: error
                    })
                });
    }

    navigateTo = (navigation) => () => {
        this.setState({navigation: navigation});
    };

    render() {
        const { error, loaded, navigation, questions, countries} = this.state;

        let content = <h1>Loading</h1>;

        if (loaded) {
            switch (navigation) {
                case 'quizz':

                    let country = countries[Math.floor(Math.random()*countries.length)];

                    content = <Quizz {...country} question={questions[Math.floor(Math.random() * questions.length)]} refresh={this.navigateTo('quizz')}/>;

                    break;

                case 'data':
                    content = <Data data={countries} columns={questions} />;
                    break;

                default:
                    content =
                        <div>
                            <h1>GeoTrainer</h1>
                            <p>is your companion to memorize geographical data.</p>
                            <br/>
                            <ul>
                                <li>Use Database contains the raw data to learn</li>
                                <li>Test your knowledge with the Quizz</li>
                            </ul>
                        </div>;
                    break;
            }
        }

        if (error) {
            content = <div className="alert alert-danger" role="alert">{error}</div>
        }

        return (
            <div className="app">
                <Navbar navigateTo={this.navigateTo} version={this.state.version} />
                <main className="container mt-5">
                    {content}
                </main>
                <footer className="footer" style={{position: 'absolute',bottom:0,height:'60px',lineHeight:'60px',width:'100%'}}>
                    <div className="container">
                        Made with <i className="fas fa-heart" style={{color:'red'}}/> in Switzerland
                    </div>
                </footer>
            </div>
        );
    }
}

export default App;
