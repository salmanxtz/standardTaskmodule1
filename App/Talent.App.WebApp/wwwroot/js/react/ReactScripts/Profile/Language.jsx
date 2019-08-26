﻿/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Table, Form, Input, Select, Button, Icon, Dropdown, Option } from 'semantic-ui-react';
import DeleteLanguage from './DeleteLanguage.jsx';
import UpdateLanguage from './UpdateLanguage.jsx';

export default class Language extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditSection: false,
            currentlyEditing: false,
            langname: "",
            langlevel: "",
            languages: [],
            language: [],
            languageData: "",
            newlanguageData: "",
            val: "",
            data: {
                name: "",
                level: ""
            },
            updateData: {
                id: " ",
                name: "",
                level: ""
            },
            name: "",
            level:""
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.addLanguage = this.addLanguage.bind(this)
        this.check = this.check.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loadData = this.loadData.bind(this)
        this.addLanguage = this.addLanguage.bind(this);
        this.addLanguages = this.addLanguages.bind(this)
        this.deleteLanguage = this.deleteLanguage.bind(this);
        this.deleteLanguages = this.deleteLanguages.bind(this);
        this.updateLanguage = this.updateLanguage.bind(this);
        this.updateLanguages = this.updateLanguages.bind(this);
        this.updateWithoutSave = this.updateWithoutSave.bind(this)
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getLanguage',
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
        let newLang = Object.assign([], this.state.languages, newValues)
        this.setState({
            languages: newLang
        })
        console.log(this.state.languages)
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

    addLanguage() {
        console.log("addLanguage called");
        this.setState({
            language: this.state.data
        },this.addLanguages);
 
    }

    deleteLanguage(lang) {
        console.log(lang)
        this.setState({
            language: lang,
            languages: []
        }, this.deleteLanguages)
    }


    addLanguages() {
        console.log("Add Languages called");
        console.log(JSON.stringify(this.state.language))
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/addLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.language),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Language Added sucessfully", "success", null, null)
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Language did not Added successfully", "error", null, null)
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

    deleteLanguages() {

        console.log(JSON.stringify(this.state.language))
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/deleteLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.language),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Language Deleted sucessfully", "success", null, null)
                    console.log("going to load data")
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Language did not deleted successfully", "error", null, null)
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

    updateLanguage() {
        console.log(this.state.language)
        this.setState({
            language: this.state.updateData
        }, this.updateLanguages)
    }

    updateLanguages() {

        console.log(JSON.stringify(this.state.language))
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.language),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Language updated sucessfully", "success", null, null)
                    console.log("going to load data")
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Language did not update successfully", "error", null, null)
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
                name: lang.name,
                level: lang.level
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
            this.setState({ data}, () => console.log(this.state.data))
        }


    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        const languageLevel = [
            "Basic",
            "Conversational",
            "Fluent",
            "Native/Bilingual",
        ]

        const languageOptions = languageLevel.map(lang => ({
            key: lang,
            text: lang,
            value: lang,

        }));

        return (

            <div className='ui sixteen wide column'>
                <React.Fragment>

                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field control={Input}
                                placeholder='Add Language'
                                name="name"
                                onChange={this.handleChange} 
                            />

                            <Form.Field>
                                <select className="ui right labeled dropdown"
                                    placeholder="Language Level"
                                    onChange={this.handleChange}
                                    name="level"
                                >
                                    <option value="">Select Level</option>
                                    <option value="Basic">Basic</option>
                                    <option value="Conversational">Conversational Level</option>
                                    <option value="Fluent">Fluent</option>
                                    <option value="Native/Bilingual">Native/Bilingual</option>
                                </select>
                            </Form.Field>
                              <Form.Field>  
                            <button type="button" className="ui teal button" onClick={this.addLanguage}>Add</button>
                        <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                        </Form.Field>
                        </Form.Group>

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

        const { languages } = this.state;

        const languageLevel = [
            "Basic",
            "Conversational",
            "Fluent",
            "Native/Bilingual",
        ]

        const languageOptions = languageLevel.map(lang => ({
            key: lang,
            text: lang,
            value: lang,

        }));

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <Table fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Language</Table.HeaderCell>
                                    <Table.HeaderCell>Level</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <button type="button" className="ui floated teal button" onClick={this.openEdit}>+ Add New</button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {languages.map((name) => (
                                    <Table.Row key={name.id}>
                                        <Table.Cell>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (

                                                <Table.Cell>
                                                    <Form>
                                                        <Form.Field control={Input}
                                                            placeholder='Add Language'
                                                            name="name"
                                                            value={this.state.updateData.name}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Form>
                                                </Table.Cell>
                                            )
                                                :
                                                (
                                                    <Table.Cell>{name.name}</Table.Cell>
                                                )
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {this.state.currentlyEditing && this.state.updateData.id  === name.id ? (
                                                <div>
                                                    <Table.Cell>
                                                        <Form>
                                                            <select className="ui right labeled dropdown"
                                                                placeholder="Language Level"
                                                                onChange={this.handleChange}
                                                                name="level"
                                                                value={this.state.updateData.level}
                                                            >
                                                                <option value="">Select Level</option>
                                                                <option value="Basic">Basic</option>
                                                                <option value="Conversational">Conversational Level</option>
                                                                <option value="Fluent">Fluent</option>
                                                                <option value="Native/Bilingual">Native/Bilingual</option>
                                                            </select>
                                                        </Form>
                                                    </Table.Cell>

                                                </div>

                                            )
                                                : (
                                                    <Table.Cell>{name.level}</Table.Cell>
                                                )
                                            }
                                        </Table.Cell>
                                        <Table.Cell textAlign='right'>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (
                                                <Table.Cell>
                                                    <button type="button" className="ui teal button" onClick={this.updateLanguage.bind(this)}>Update</button>
                                                    <button type="button" className="ui button" onClick={this.cancel.bind(this)}>Cancel</button>
                                                </Table.Cell>
                                            )
                                                : (
                                                    <Table.Cell>
                                                        <Table.Cell>
                                                            <Icon link name='pencil' onClick={this.check.bind(this, name)} />
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Icon link name='delete' onClick={this.deleteLanguage.bind(this,name)} />
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