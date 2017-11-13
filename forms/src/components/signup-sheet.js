import React, { Component } from 'react';
import _ from 'lodash';

export default class SignupSheet extends Component {

    state = {
        fields: {
            name: '',
            email: '',
            phoneNumber: ''
        },
        fieldErrors: {},
        people: []
    }

    componentDidMount() {
        this.validateForm();
    }

    render() {
        return (
            <div>
                <h1>Sign-up Sheet</h1>
                <form onSubmit={this.onFormSubmit}>
                    <ErrorableInputField value={this.state.fields.name} placeholder="Name" name='name'
                        onChange={this.onFieldChange} error={this.state.fieldErrors.name} />
                    <ErrorableInputField value={this.state.fields.email} placeholder="Email" name='email'
                        onChange={this.onFieldChange} error={this.state.fieldErrors.email} />
                    <ErrorableInputField value={this.state.fields.phoneNumber} placeholder="Phone number"
                        name='phoneNumber' onChange={this.onFieldChange} type='tel'
                        error={this.state.fieldErrors.phoneNumber} />
                    <br />
                    <button type="submit" disabled={!this.isFormValid()}>Submit</button>
                </form>
                <br />
                <ol>
                    {this.state.people.map((person, idx) => <li key={idx}>{`${person.name} (${person.email} - ${person.phoneNumber})`}</li>)}
                </ol>
            </div>
        );
    }

    onFieldChange = (event) => {
        const fields = {};
        fields[event.target.name] = event.target.value;
        this.setState({ fields: Object.assign(this.state.fields, fields) });

        this.validateForm();
    }

    validateForm = () => {
        const fieldErrors = {};
        Object.keys(this.state.fields).forEach(field => {
            if (this.state.fields[field].length === 0) {
                fieldErrors[fi  eld] = `${field} cannot be empty`;
            }
        });

        this.setState({ fieldErrors: fieldErrors });
    }

    isFormValid = () => _.isEmpty(this.state.fieldErrors);

    onFormSubmit = (event) => {
        event.preventDefault();

        this.setState(prevState => {
            return {
                fields: {
                    name: '',
                    email: '',
                    phoneNumber: ''
                },
                people: prevState.people.concat([prevState.fields])
            }
        }, () => this.validateForm());
    }
}

function ErrorableInputField(props) {
    return (
        <div>
            <input value={props.value} name={props.name} type={props.type} placeholder={props.placeholder}
                onChange={props.onChange} />
            <span style={{ color: "red", fontSize: "small", marginLeft: "10px" }}>{props.error}</span>
        </div>
    );
}