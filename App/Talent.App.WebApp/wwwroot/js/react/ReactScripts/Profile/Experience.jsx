/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Table, Form, Input, Select, Button, Icon, Dropdown, Option } from 'semantic-ui-react';
import moment from 'moment'

export default class Language extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditSection: false,
            currentlyEditing: false,
            langname: "",
            langlevel: "",
            experience: [],
            experienc: [],
            val: "",
            data: {
                company: "",
                position: "",
                responsibilities: "",
                start: "",
                end: ""
            },
            updateData: {
                id: " ",
                company: "",
                position: "",
                responsibilities: "",
                start: "",
                end: ""
            },
            name: "",
            level: ""
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        //this.addLanguage = this.addLanguage.bind(this)
        this.check = this.check.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loadData = this.loadData.bind(this)
        this.addExperience = this.addExperience.bind(this);
        this.addExperiences = this.addExperiences.bind(this)
        this.deleteExperience = this.deleteExperience.bind(this);
        this.deleteExperiences = this.deleteExperiences.bind(this);
        this.updateExperience = this.updateExperience.bind(this);
        this.updateExperiences = this.updateExperiences.bind(this);
        this.updateWithoutSave = this.updateWithoutSave.bind(this)
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                console.log(res.data)
                this.updateWithoutSave(res.data)
            }.bind(this)
        })
    }

    updateWithoutSave(newValues) {
        console.log(newValues)
        let newExperience = Object.assign([], this.state.experience, newValues)
        this.setState({
            experience: newExperience
        })
        console.log(this.state.experience)
    }

    openEdit() {
        //const languageData = Object.assign({}, this.props.languageData)
        this.setState({
            showEditSection: true,
            updateData: { id: null }
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
        console.log("Close Edit:" + this.state.currentlyEditing);
    }

    addExperience() {
        console.log("addExperience called");
        this.setState({
            experienc: this.state.data
        }, this.addExperiences);

    }

    deleteExperience (lang) {
        console.log(lang)
        this.setState({
            experienc: lang,
            experience: []
        }, this.deleteExperiences)
    }


    addExperiences() {
        console.log("Add Experience called");
        console.log(JSON.stringify(this.state.experienc))
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/addExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.experienc),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Experience Added sucessfully", "success", null, null)
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Experience did not Added successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res.success + "errormess")
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })

    }

    deleteExperiences() {

        console.log(JSON.stringify(this.state.experienc))
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/deleteExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.experienc),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Experience Deleted sucessfully", "success", null, null)
                    console.log("going to load data")
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Experience did not deleted successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res.success + "errormess")
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }

    updateExperience() {
        console.log(this.state.experienc)
        this.setState({
            experienc: this.state.updateData
        }, this.updateExperiences)
    }

    updateExperiences() {

        console.log(JSON.stringify(this.state.experienc))
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/UpdateExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.experienc),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Experience updated sucessfully", "success", null, null)
                    console.log("going to load data")
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Experience did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res.success + "errormess")
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
        this.cancel()
    }

    check(lang) {
        console.log(lang)
        this.setState({
            currentlyEditing: true,
            updateData: {
                id: lang.id,
                company: lang.company,
                position: lang.position,
                responsibilities: lang.responsibilities,
                start: lang.start,
                end: lang.end
            }
        })

    }

    cancel() {
        this.setState({
            currentlyEditing: false,
        })
        console.log("Cancel clicked after:" + this.state.currentlyEditing);
    }

    handleChange() {

        if (this.state.updateData.id != null) {
            const updateData = Object.assign({}, this.state.updateData);
            updateData[event.target.name] = event.target.value;
            this.setState({ updateData }, () => console.log(this.state.updateData))
        }
        else {
            const data = Object.assign({}, this.state.data);
            data[event.target.name] = event.target.value;
            this.setState({ data }, () => console.log(this.state.data))
        }


    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {

        return (

            <div className='ui sixteen wide column'>
                <React.Fragment>

                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field control={Input}
                                placeholder='Add Company'
                                name="company"
                                onChange={this.handleChange}
                            />

                            <Form.Field control={Input}
                                placeholder='Add Position'
                                name="position"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field control={Input}
                                type="date"
                                placeholder='Start Date'
                                name="start"
                                onChange={this.handleChange}
                            />

                            <Form.Field control={Input}
                                type="date" placeholder='End Date'
                                name="end"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field control={Input}
                                placeholder='Add Responsibilities'
                                name="responsibilities"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Field>
                            <button type="button" className="ui teal button" onClick={this.addExperience}>Add</button>
                            <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                        </Form.Field>
                    </Form>
                    <br />
                </React.Fragment>

                <React.Fragment>
                    {this.renderDisplay()}
                </React.Fragment>
            </div>
        )
    }

    renderDisplay() {
        console.log("Called Display");
        console.log(this.state.updateData);

        const { experience } = this.state;

        let current_datetime_start = new Date(this.state.updateData.start);
        let formatted_start = current_datetime_start.getFullYear() + "-" + ("0" + (current_datetime_start.getMonth() + 1)).slice(-2) + "-" + ("0" + current_datetime_start.getDate()).slice(-2) 

        let current_datetime_end = new Date(this.state.updateData.end);
        let formatted_end = current_datetime_end.getFullYear() + "-" + ("0" + (current_datetime_end.getMonth() + 1)).slice(-2) + "-" + ("0" + current_datetime_end.getDate()).slice(-2) 

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <Table fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Company</Table.HeaderCell>
                                    <Table.HeaderCell>Position</Table.HeaderCell>
                                    <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                                    <Table.HeaderCell>Start</Table.HeaderCell>
                                    <Table.HeaderCell>End</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <button type="button" className="ui floated teal button" onClick={this.openEdit}>+ Add New</button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {experience.map((name) => (
                                    <Table.Row key={name.id}>
                                        <Table.Cell>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (

                                                <Table.Cell>
                                                    <Form>
                                                        <Form.Field control={Input}
                                                            placeholder='Add Company'
                                                            name="company"
                                                            value={this.state.updateData.company}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Form>
                                                </Table.Cell>
                                            )
                                                :
                                                (
                                                    <Table.Cell>{name.company}</Table.Cell>
                                                )
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (
                                                <div>
                                                    <Table.Cell>
                                                        <Form>
                                                            <Form.Field control={Input}
                                                                placeholder='Add Position'
                                                                name="position"
                                                                value={this.state.updateData.position}
                                                                onChange={this.handleChange}
                                                            />
                                                        </Form>
                                                    </Table.Cell>

                                                </div>

                                            )
                                                : (
                                                    <Table.Cell>{name.position}</Table.Cell>
                                                )
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (

                                                <Table.Cell>
                                                    <Form>
                                                        <Form.Field control={Input}
                                                            placeholder='Add Responsibilities'
                                                            name="responsibilities"
                                                            value={this.state.updateData.responsibilities}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Form>
                                                </Table.Cell>
                                            )
                                                :
                                                (
                                                    <Table.Cell>{name.responsibilities}</Table.Cell>
                                                )
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (

                                                <Table.Cell>
                                                    <Form>
                                                        <Form.Field control={Input}
                                                            type="date"
                                                            placeholder='Start Date'
                                                            name="start"
                                                            value={formatted_start}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Form>
                                                </Table.Cell>
                                            )
                                                :
                                                (
                                                    <Table.Cell>{moment(name.start).format('Do MMMM YYYY')}</Table.Cell>
                                                )
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (

                                                <Table.Cell>
                                                    <Form>
                                                        <Form.Field control={Input}
                                                            type="date"
                                                            placeholder='End Date'
                                                            name="end"
                                                            value={formatted_end}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Form>
                                                </Table.Cell>
                                            )
                                                :
                                                (
                                                    <Table.Cell>{moment(name.end).format('Do MMMM YYYY')}</Table.Cell>
                                                )
                                            }
                                        </Table.Cell>
                                        <Table.Cell textAlign='right'>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (
                                                <Table.Cell>
                                                    <button type="button" className="ui teal button" onClick={this.updateExperience.bind(this)}>Update</button>
                                                    <button type="button" className="ui button" onClick={this.cancel.bind(this)}>Cancel</button>
                                                </Table.Cell>
                                            )
                                                : (
                                                    <Table.Cell>
                                                        <Table.Cell>
                                                            <Icon link name='pencil' onClick={this.check.bind(this, name)} />
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Icon link name='delete' onClick={this.deleteExperience.bind(this, name)} />
                                                        </Table.Cell>
                                                    </Table.Cell>
                                                )}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>

                        </Table>
                    </React.Fragment>
                </div>
            </div>
        )
    }
}