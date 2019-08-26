import React from 'react'
import { Form, Checkbox, Radio } from 'semantic-ui-react';
import { SingleInput, ChildSingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);

        const status = props.status ?
            Object.assign({}, props.status)
            : {
                status: "",
                availableDate: null
            }

        this.state = {
            newstatus: status
        }
        
        console.log("Status:" + this.props.status.status);

        this.handleChange = this.handleChange.bind(this)
    }
    componentDidUpdate() {
        //alert(document.querySelector('input[name=jobStatus]:checked').value);
        //console.log(document.querySelector('input[name=jobStatus]:checked').value);
    }

    handleChange(event) {
        console.log("HandleChange Values:" + this.state.newstatus);
        const data = Object.assign({}, this.state.newstatus)
        data[event.target.name] = event.target.value
        this.setState({
            newstatus: data
        })
    }

    check() {
        console.log("After selection:")
        console.log(this.state.newstatus);
        const data = Object.assign({}, this.state.newstatus)
        this.props.saveProfileData({ jobSeekingStatus: data });
        this.props.updateProfileData({ jobSeekingStatus: data });
    }
    
    render() {
        console.log("Enterring render:" + this.state.newstatus.status + "-" + this.props.status.status);
        
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <Form>
                            <Form.Field>
                                
                                <input type='radio' label='Actively looking for a job' id='jobStatus-1' name='status' value='Actively looking for a job'
                                    checked={(this.state.newstatus.status === 'Actively looking for a job') || (this.props.status.status === 'Actively looking for a job')}
                                    onChange={this.handleChange}
                                    />
                                {'  '} Actively looking for a job
                            </Form.Field>
                            <Form.Field>
                                
                                <input type='radio' label='Not looking for a job at the moment' id='jobStatus-2' name='status' value='Not looking for a job at the moment'
                                    checked={(this.state.newstatus.status === 'Not looking for a job at the moment') || (this.props.status.status === 'Not looking for a job at the moment')}
                                    onChange={this.handleChange}
                                    />
                                { '  ' } Not looking for a job at the moment
                            </Form.Field>
                            <Form.Field>

                                <input type='radio' label='Currently employed but open to offers' id='jobStatus-3' name='status' value='Currently employed but open to offers'
                                    checked={(this.state.newstatus.status === 'Currently employed but open to offers') || (this.props.status.status === 'Currently employed but open to offers')}
                                    onChange={this.handleChange}
                                    />
                                {'  '} Currently employed but open to offers
                            </Form.Field>
                            <Form.Field>

                                <input type='radio' label='Will be available on later date' id='jobStatus-4' name='status' value='Will be available on later date'
                                    checked={(this.state.newstatus.status === 'Will be available on later date') || (this.props.status.status === 'Will be available on later date')}
                                    onChange={this.handleChange}
                                     />
                                {'  '} Will be available on later date
                            </Form.Field>

                            <button type="button" className="ui teal button" onClick={this.check.bind(this)}> Save </button>
                        </Form>
                    </React.Fragment>
                </div>
            </div>
            
            );
        
    }
}