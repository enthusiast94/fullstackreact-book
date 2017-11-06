
import React, { Component } from 'react';

export default class SignupSheet extends Component {

    state = {
        fields: {
            name: '',
            email: '',
            phoneNumber: ''
        },
        people: []
    }

    render() {
        return (
            <div>
                <h1>Sign-up Sheet</h1>
                <form onSubmit={this.onFormSubmit}>
                    <input value={this.state.fields.name} placeholder="Name" name='name' onChange={this.onFieldChange}
                        style={{ display: "block" }} />
                    <input value={this.state.fields.email} placeholder="Email" name='email' onChange={this.onFieldChange}
                        style={{ display: "block" }} />
                    <input value={this.state.fields.phoneNumber} placeholder="Phone number" name='phoneNumber'
                        onChange={this.onFieldChange} style={{ display: "block" }} type='tel' />
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
    }

    isFormValid = () => this.state.fields.name.length > 0 &&
        this.state.fields.email.length > 0 &&
        this.state.fields.phoneNumber.length > 0;

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
        });
    }
}   