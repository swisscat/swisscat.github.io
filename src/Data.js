import React, { Component } from 'react';

class Data extends Component {

    constructor(props) {
        super(props);

        this.state = {
            columns: this.props.columns
        }
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col" />
                    <th scope="col">Country</th>
                    <th scope="col">Capital</th>
                    <th scope="col">Population</th>
                </tr>
                </thead>
                <tbody>
                {this.props.data.map(country => (
                    <tr key={country}>
                        <th scope="row" style={{width: '8%'}}><img src={country.flag} alt={country.flag} className="img-thumbnail" /></th>
                        <td>{country.names.join(', ')}</td>
                        <td>{country.capital}</td>
                        <td>{country.population.toLocaleString()}</td>
                    </tr>

                ))}
                </tbody>
            </table>
        )
    }
}

export default Data;