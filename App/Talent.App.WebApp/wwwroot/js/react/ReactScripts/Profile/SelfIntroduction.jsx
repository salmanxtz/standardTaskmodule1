/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie'
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Form, TextArea, Input } from 'semantic-ui-react'

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);
        
        const summary = props.summary ?
            Object.assign({}, props.summary)
            : "";

        const description = props.description ?
            Object.assign({}, props.description)
            : "";


        this.state = {
            showEditSection: false,
            newsummary: summary,
            newdescription: description
        }
        //this.saveDescription = this.saveDescription.bind(this);

        this.openEdit = this.openEdit.bind(this)
    };

    handleChange(event) {
        //const data = Object.assign({}, this.state.newsummary)
        console.log("Summary:" + this.state.newsummary + "-" + this.state.newdescription);
        
        this.props.updateWithoutSave({ summary: this.state.newsummary, description: this.state.newdescription });
        this.props.updateProfileData({ summary: this.state.newsummary, description: this.state.newdescription });

        this.setState({
            showEditSection: false
        })
    }

    openEdit() {
        console.log("Open Values before:" + this.props.summary + "-" + this.props.description);
        const summary = Object.assign({}, this.props.summary)
        const description = Object.assign({}, this.props.description)
        
        this.state = {
            newsummary: summary,
            newdescription: description
        }
        this.setState({
            showEditSection: true
        })

        console.log("Open Values after:" + this.state.newsummary + "-" + this.state.newdescription);
    }

    handleChangeSummary(event) {
        const data = Object.assign({}, event.target.value)
        //data[event.target.name] = event.target.value
        this.setState({
            newsummary: data
        })
        console.log("Handle Change Edit:" + this.state.newsummary);
    }

    //saveDescription() {
    //    console.log("Saving the description value:" + this.state.newdescription);
        
    //    this.props.updateWithoutSave({ description: this.state.newdescription });
    //    this.props.updateProfileData({ description: this.state.newdescription });
        
    //}

    //setvalue() {
    //    console.log("Setvalue:" + this.props.summary);
    //    const data = Object.assign({}, this.props.summary)
    //    console.log(this.state.data);
    //    this.setState({
    //        newsummary: data
    //    })
    //}

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderDisplay() {

        console.log("Render Summary" + this.props.summary);
        console.log("Render Description" + this.props.description);

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <Form>
                            <Form.Field>
                                <Form.Field control={Input} name="summary" value={this.props.summary}
                                    label="Summary must be no more than 150 characters."
                                    placeholder="Please provide a short summary about yourself"
                                    onClick={this.openEdit}
                                    
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.TextArea fluid control={Input} name="description" value={this.props.description}
                                    label="Description must be between 150-600 characters."
                                    placeholder='Please tell us about any hobbies, additional expertise or anything else you would like to add.'
                                    onClick={this.openEdit}
                                />
                            </Form.Field>
                        </Form>
                    </React.Fragment>
                    <br />
                    <button type="button" className="ui teal button" onClick={this.handleChange.bind(this)}>Save</button>
                </div>
            </div>
        )
    }

    renderEdit() {

        console.log("Render Edit Summary" + this.state.newsummary + "-" + this.props.summary);
        console.log("Render Edit Description" + this.state.newdescription + "-" + this.props.description);

        let newsummary = this.props.summary;
        let newdescription = this.props.description;

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <Form>
                            <Form.Field>
                                <Form.Field control={Input} name="summary" value={newsummary}
                                    label="Summary must be no more than 150 characters."
                                    placeholder="Please provide a short summary about yourself"
                                    onChange={e => this.setState({ newsummary: e.target.value })}

                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.TextArea fluid control={Input} name="description" value={newdescription}
                                    label="Description must be between 150-600 characters."
                                    placeholder='Please tell us about any hobbies, additional expertise or anything else you would like to add.'
                                    onChange={e => this.setState({ newdescription: e.target.value })}
                                />
                            </Form.Field>
                        </Form>
                    </React.Fragment>
                    <br />
                    <button type="button" className="ui teal button" onClick={this.handleChange.bind(this)}>Save</button>
                </div>
            </div>
        )
    }
}



