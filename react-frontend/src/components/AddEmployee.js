import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserService from "../services/UserService";

class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Email: "",
            dob: "",
            update: false,
        }
        this.changeDobHandler = this.changeDobHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.addInfo = this.addInfo.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
    }

    componentDidMount() {
        console.log(this.props.location.state);
        const empId = this.props.location.state;
        if (empId !== undefined) {
            this.setState({ update: true });
            UserService.getUsers().then(response => {
                const employees = response.data;
                console.log(employees[0].id);
                const empl = employees.filter(emp => emp.id == empId);
                console.log(empl);
                this.setState({ Name: empl[0].name, Email: empl[0].email, dob: empl[0].dob });
            })
        } else {
            console.log("NAH");
        }
    }

    changeNameHandler(event) {
        this.setState({ Name: event.target.value })
    }
    changeEmailHandler(event) {
        this.setState({ Email: event.target.value })
    }
    changeDobHandler(event) {
        this.setState({ dob: event.target.value })
    }

    addInfo(event) {
        event.preventDefault();
        console.log(this.state.Name);
        console.log(this.state.Email);
        console.log(this.state.dob);
        const employee = {
            "name": this.state.Name,
            "email": this.state.Email,
            "dob": this.state.dob
        }
        UserService.addUser(employee).then(response => {
            console.log(response.status);
            if (response.status === 200) {
                this.props.history.push("/employees");
            }
        })
    }

    updateInfo(event) {
        event.preventDefault();
        const empId = this.props.location.state;
        UserService.updateEmployee(empId, this.state.Name, this.state.Email).then(response => {
            console.log(response.status);
            if (response.status === 200) {
                this.props.history.push("/employees");
            }
        })
    }
    render() {
        return (
            <div className="form-group">
                <form style={{ "marginTop": "50px" }}>
                    <fieldset className="border p-5 pt-1 w-50" style={{ "margin": "0 auto" }}>
                        <legend style={{ textAlign: "center" }}><b>{this.state.update ? "Update" : "Add"} Employee</b></legend>
                        <div className="float-start w-100" style={{ "display": "inline-block", "text-align": "left" }}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" id="name" className="form-control"
                                    placeholder="Enter Name" onChange={this.changeNameHandler} value={this.state.Name}></input>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="text" id="email" className="form-control"
                                    placeholder="Enter Email" onChange={this.changeEmailHandler} value={this.state.Email}></input>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Date Of Birth</label>
                                <input type="date" id="age" className="form-control" readOnly={this.state.update}
                                    placeholder="Enter DOB" onChange={this.changeDobHandler} value={this.state.dob}></input>
                            </div>
                            <button type="submit" className="btn btn-success" onClick={this.state.update ? this.updateInfo : this.addInfo}>Save</button>{"   "}
                            <button type="submit" className="btn btn-danger" onClick={() => { this.props.history.push("/employees") }}>Cancel</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default withRouter(AddEmployee);