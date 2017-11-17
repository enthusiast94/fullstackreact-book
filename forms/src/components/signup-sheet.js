import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

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
                    <CourseSelect onChange={(fields) => console.log(fields)} />
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
                fieldErrors[field] = `${field} cannot be empty`;
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

class CourseSelect extends Component {

    static propTypes = {
        department: PropTypes.string,
        course: PropTypes.string,
        onChange: PropTypes.func.isRequired
    };

    state = {
        department: null,
        course: null,
        courses: [],
        _loading: false
    };

    componentWillReceiveProps(update) {
        this.setState({
            department: update.department,
            course: update.course
        });
    }

    renderDepartmentSelect = () => {
        return (
            <select value={this.state.department || ""} onChange={this.onSelectDepartment}>
                <option value="">Which department?</option>
                <option value="core">NodeSchool: Core</option>
                <option value="electives">NodeSchool: Electives</option>
            </select>
        )
    };

    renderCourseSelect = () => {
        if (this.state._loading) {
            return <div>Loading...</div>
        } else if (!this.state.department) {
            return <span></span>
        } else {
            return (
                <select onChange={this.onSelectCourse}>
                    <option value="">Which course?</option>
                    {this.state.courses.map((course, idx) => {
                        return (
                            <option key={idx}>{course}</option>
                        )
                    })}
                </select>
            );
        }
    };

    onSelectDepartment = (event) => {
        const department = event.target.value;
        const course = null;
        this.setState({ department, course });
        this.props.onChange({ name: "department", value: department });
        this.props.onChange({ name: "course", value: course });

        if (department) {
            this.fetch(department);
        }
    };

    onSelectCourse = (event) => {
        const course = event.target.value;
        this.setState({ course });
        this.props.onChange({ name: "course", value: course });
    }

    fetch = (department) => {
        this.setState({ _loading: true, courses: [] });
        this.apiClient(department).then(courses => {
            this.setState({ _loading: false, courses: courses });
        });
    };

    apiClient = (department) => {
        const coursesByDepartment = {
            "core": ["Math", "Physics"],
            "electives": ["Chemisty", "Computer Science"]
        };

        return new Promise((resolve) => {
            setTimeout(() => resolve(coursesByDepartment[department]), 1000);
        });
    };

    render() {
        return (
            <div>
                {this.renderDepartmentSelect()}
                <br />
                {this.renderCourseSelect()}
            </div>
        );
    }
}
