import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { Dropdown, Popup, Button, Form } from 'semantic-ui-react'

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)

        const visaStatus = props.visaStatus ?
            Object.assign({}, props.visaStatus)
            : "";

        const visaExpiryDate = props.visaExpiryDate ?
            Object.assign({}, props.visaExpiryDate)
            : "";

        this.state = {
            newvisaStatus: visaStatus,
            newvisaExpiryDate: visaExpiryDate,
            showEditSection: false,
            visaOptions: [
                {
                    key: 'citizen',
                    text: 'Citizen',
                    value: 'citizen',
                },
                {
                    key: 'permanent resident',
                    text: 'Permanent Resident',
                    value: 'permanent resident',
                },
                {
                    key: 'work visa',
                    text: 'Work Visa',
                    value: 'work visa',
                },
                {
                    key: 'student visa',
                    text: 'Student Visa',
                    value: 'student visa',
                }

            ]
        }

        this.changevalue = this.changevalue.bind(this);
    }

    changevalue(value){

        console.log("Entered in the function:" + value);

        this.state = {
            visaStatus: value
        }

        console.log("Before setting the status: " + this.state.visaStatus);

        if (value === 'work visa' || value === 'student visa') {

            this.setState({
                IsEnabled: true,
            })

            this.setState({
                showEditSection: true,
            })
            
        }
        else {
            console.log("Entered in if else loop");
            this.setState({
                showEditSection: true,
                
            })
        }
        console.log("After setting the status: " + this.state.visaStatus + "-" + this.state.IsEnabled);
        
    }

    savevisaStatus() {
        console.log("savevisaStatus:");
        console.log(this.props.visaStatus);
        this.props.saveProfileData({ visaStatus: this.props.visaStatus, visaExpiryDate: this.props.visaExpiryDate });
        this.props.updateProfileData({ visaStatus: this.props.visaStatus, visaExpiryDate: this.props.visaExpiryDate });
    }

    savevisaStatuswithDate() {
        console.log("savevisaStatuswithDate:");
        console.log(this.state.visaStatus);
        if (this.state.visaStatus === 'work visa' || this.state.visaStatus === 'student visa') {
            this.props.saveProfileData({ visaStatus: this.state.visaStatus, visaExpiryDate: this.state.visaExpiryDate });
            this.props.updateProfileData({ visaStatus: this.state.visaStatus, visaExpiryDate: this.state.visaExpiryDate });
        }
        else {
            this.props.saveProfileData({ visaStatus: this.state.visaStatus, visaExpiryDate: '' });
            this.props.updateProfileData({ visaStatus: this.state.visaStatus, visaExpiryDate: '' });
        }
    }

    renderDisplay() {

        let current_datetime = new Date(this.props.visaExpiryDate);
        let formatted_date = current_datetime.getFullYear() + "-" + ("0" + (current_datetime.getMonth() + 1)).slice(-2) + "-" + ("0" + current_datetime.getDate()).slice(-2) 

        let val = this.props.visaStatus;

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <Form>
                            <Form.Group>
                                {<Form.Select
                                    fluid
                                    label="Visa Type"
                                    selection
                                    placeholder="Select your Visa type"
                                    options={this.state.visaOptions}
                                    width={6}
                                    value={val}
                                    onChange={(e, { value }) => {
                                        this.setState({ visaStatus: value }, this.changevalue(value))
                                    }}
                                />}
                                {(this.props.visaStatus === 'work visa' || this.props.visaStatus === 'student visa') ?
                                    <Form.Input label='Visa Expiry Date' width={6} placeholder='Date' type='date'
                                        value={formatted_date}
                                    />
                                    :
                                    null}
                            </Form.Group>
                        </Form>

                    </React.Fragment>
                    <button type="button" className="ui floated teal button" onClick={this.savevisaStatus.bind(this)}>Save</button>
                </div>
            </div>

        )
    }

    renderEdit() {
        
        return (
            
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>

                        <Form>
                            <Form.Group>
                                <Form.Select
                                    fluid
                                    label="Visa Type"
                                    selection
                                    value={this.state.visaStatus}
                                    options={this.state.visaOptions}
                                    width={6}
                                    onChange={(e, { value }) => {
                                        this.setState({ visaStatus: value })
                                    }}
                                />
                                {(this.state.visaStatus === 'work visa' || this.state.visaStatus === 'student visa' ) ?
                                <Form.Input label='Visa Expiry Date' width={6} placeholder='Date' type='date' 
                                    onChange={(e, { value }) => {
                                        this.setState({ visaExpiryDate: value })
                                    }}
                                    /> :
                                    null}

                            </Form.Group>
                        </Form>
                    </React.Fragment>
                    <button type="button" className="ui teal button" onClick={this.savevisaStatuswithDate.bind(this)}>Save</button>
                </div>
            </div>

        )
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    
}