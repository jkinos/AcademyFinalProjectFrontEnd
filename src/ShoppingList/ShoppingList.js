import React, {Component} from 'react';
import update from "immutability-helper";
import {Row, Table} from "react-bootstrap";
import {Checkbox} from "@material-ui/core";
import MyCheckbox from "./MyCheckbox";

let myOptions=["1","2","3"];

class ShoppingList extends Component {

    constructor(props) {
        super(props);
        this.state={
            checkboxes: myOptions.reduce(
                (options,option) => ({
    ...options,
                    [option]: false}), {})
        };
    }


    selectAllCheckboxes = isSelected => {
        Object.keys(this.state.checkboxes).forEach(checkbox => {
            // BONUS: Can you explain why we pass updater function to setState instead of an object?
            this.setState(prevState => ({
                checkboxes: {
                    ...prevState.checkboxes,
                    [checkbox]: isSelected
                }
            }));
        });
    };

    selectAll = () => this.selectAllCheckboxes(true);

    deselectAll = () => this.selectAllCheckboxes(false);

    handleCheckboxChange = changeEvent => {
        const { name } = changeEvent.target;

        this.setState(prevState => ({
            checkboxes: {
                ...prevState.checkboxes,
                [name]: !prevState.checkboxes[name]
            }
        }));
    };

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        Object.keys(this.state.checkboxes)
            .filter(checkbox => this.state.checkboxes[checkbox])
            .forEach(checkbox => {
                console.log(checkbox, "is selected.");
            });
    };

    createCheckbox = option => (
        <MyCheckbox
            label={option}
            isSelected={this.state.checkboxes[option]}
            onCheckboxChange={this.handleCheckboxChange}
            key={option}
        />
    );

    createCheckboxes = () => myOptions.map(this.createCheckbox);

    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-sm-12">
                        <form onSubmit={this.handleFormSubmit}>
                            {this.createCheckboxes()}

                            <div className="form-group mt-2">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary mr-2"
                                    onClick={this.selectAll}
                                >
                                    Select All
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary mr-2"
                                    onClick={this.deselectAll}
                                >
                                    Deselect All
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default ShoppingList;