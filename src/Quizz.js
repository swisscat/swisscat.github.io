import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { stringSimilarity } from "string-similarity-js";

class Quizz extends Component {
    constructor(props) {
        super(props);
        this.state = { answer: '', formattedAnswer: '', showFeedback: false, similarityThreshold: 0.5, numberThreshold: 0.1 };
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    validateAnswer() {
        let possibilities = [this.props[this.props.question]];

        switch (this.props.question) {
            case 'name':
                possibilities = this.props.names;
                break;

            case 'population':
                return Math.abs((this.state.answer - this.props.population) / this.props.population) < this.state.numberThreshold;

            case 'capital':
                break;

            default:
                break;
        }

        return possibilities.some((item) => {
            return stringSimilarity(item, this.state.answer) > this.state.similarityThreshold;
        });
    }

    render() {
        let feedback, feedbackType, feedbackComponent;
        if (this.state.answer && this.state.showFeedback) {

            if (!this.props.question) {
                feedback = "Missing question";
                feedbackType = "danger";
            }
            else if (typeof this.props[this.props.question] === "undefined") {
                feedback = "Invalid question type " + this.props.question;
                feedbackType = "danger";
            }
            else if (this.validateAnswer()) {
                feedback = "Correct!";
                feedbackType = "success";
            }
            else {
                feedback = "Wrong! The " + this.props.question + " is " + this.props[this.props.question].toLocaleString();
                feedbackType = "danger";
            }

            feedbackComponent = <div className={`mt-5 alert alert-${feedbackType}`}>{feedback}</div>
        }

        let input = <input className="form-control" type="text" onChange={(e) => this.setState({answer: e.target.value})} onKeyPress={this.handleKeyPress} value={this.state.answer} />;


        if (this.props.question === 'population') {
            input = <NumberFormat className="form-control" onKeyPress={this.handleKeyPress} thousandSeparator={true} value={this.state.formattedAnswer} onValueChange={(values) => {
                const {formattedValue, value} = values;
                this.setState({formattedAnswer: formattedValue, answer: value})
            }}/>
        }

        return (
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <img className="card-img-top border-bottom" src={this.props.flag} alt="{this.props.name}" />
                        <div className="card-body">
                            <h5 className="card-title">What's the {this.props.question} of this country ?</h5>
                            {input}
                        </div>
                        <div className="card-footer">
                            <button type="button" className="btn btn-default btn-outline-primary" onClick={() => {this.setState({showFeedback: true})}}>
                                <i className="fas fa-check" />&nbsp;
                                Check
                            </button>
&nbsp;
                            <button type="button" className="btn btn-default btn-outline-secondary" onClick={this.refresh}>
                                <i className="fas fa-sync" />&nbsp;
                                Reload
                            </button>
                        </div>
                    </div>

                    {feedbackComponent}
                </div>
            </div>
        )
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (this.state.showFeedback) {
                return this.refresh();
            }

            this.setState({showFeedback: true});
            return false;
        }
    }

    refresh() {
        this.setState({answer: '', showFeedback: false});
        this.props.refresh();
    }
}

export default Quizz;