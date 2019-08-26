/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Image, Input } from 'semantic-ui-react'
import logo from './s3.jpg'


export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);

        const profilePhoto = props.profilePhoto ?
            Object.assign({}, props.profilePhoto)
            : "camera.jpg";

        const profilePhotoUrl = props.profilePhotoUrl ?
            Object.assign({}, props.profilePhotoUrl)
            : "";

        this.state = {
            image1: "https://www.heavydutydirect.ca/wp-content/uploads/2019/02/camera-placeholder-150x150.jpg",
            image: "camera.jpg",
            showEditSection: false,
            imagecheck: "",
            val: "",
            fullUrl: "",
            newprofilePhoto: profilePhoto,
            newprofilePhotoUrl: profilePhotoUrl
        }
        this.closeEdit = this.closeEdit.bind(this)
        this.uploadpic = this.uploadpic.bind(this)
        this.uploadpicvalue = this.uploadpicvalue.bind(this)
       
    };

    handleClick(e) {
        this.refs.fileUploader.click();
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    upload(e) {
        e.preventDefault();
        console.log("Clicked");
    }

    uploadpicvalue(val) {
        console.log("In Uploadpic before:" + this.state.newprofilePhoto);
        console.log("In Uploadpic value received:" + val);
        this.setState({
            newprofilePhoto: val
        })
        console.log("In Uploadpic after:" + this.state.newprofilePhoto);
    }

    uploadpic() {

        this.props.updateProfileData({ profilePhoto: this.state.newprofilePhoto });
        this.props.saveProfileData({ profilePhoto: this.state.newprofilePhoto });

        this.setState({
            showEditSection: false,
        })

    }

    onChangeFile(event) {
        
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        console.log(file);
        this.state = {
            newprofilePhoto: file.name,
            
        }; 

        const val1 = this.state.newprofilePhoto;
        console.log("Image: " + val1);

        this.setState({
            showEditSection: true
        })
        this.uploadpicvalue(val1);
    }

    render() {
        return (
            this.state.showEditSection ? this.renderselect() : this.renderdisplay()
        )
    }

    renderselect() {

        //const disp = `/images/${this.state.profilePhoto}`;

        //this.state = {
        //    profilePhoto: disp
        //}

        const path = "/images/" + this.state.newprofilePhoto;
        const newprofilePhoto = this.state.newprofilePhoto;

        this.state = {
            fullUrl: path,
            newprofilePhoto: newprofilePhoto
        }

        console.log("Render Select:" + this.state.profilePhoto);
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <div className="add-media">
                        <React.Fragment>
                            <img src={this.state.fullUrl}
                                title="Please upload your profile photo." id="profile-image-preview"
                                alt="Thumbnail Photo" class="image--cover" />
                            <br />
                            <button type="button" className="ui teal button" onClick={this.uploadpic}>Upload</button>
                            
                        </React.Fragment>
                    </div>
                </div>
            </div>
        );
    }


    renderdisplay() {

        console.log("Display Image name before:", this.state.newprofilePhoto + "-" + this.props.profilePhoto);

        //this.setState(prevState => ({
        //     image: ["C:/Users/kumar/Desktop/IndustryConnect/TeamV/pics/", ...prevState.image]
        //}))

        //const disp = `C:/Users/kumar/Desktop/IndustryConnect/TeamV/pics/${this.state.image}`;

        //const path = "/images/" + this.state.newprofilePhoto;
        const path = "/images/" + this.props.profilePhoto;
        const newprofilePhoto = this.state.newprofilePhoto;

        this.state = {
            fullUrl: path,
            newprofilePhoto: newprofilePhoto
        }

        
        console.log("Display Image name after:", this.state.newprofilePhoto);

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <div className="add-media" onClick={this.handleClick.bind(this)}>
                        <React.Fragment>
                            <img src={this.state.fullUrl}
                                title="Please upload your profile photo." id="profile-image-preview"
                                alt="Thumbnail Photo" class="image--cover" onClick={(e) => { this.upload(e) }} />
                            <input type="file" id="file" ref="fileUploader" style={{ display: "none" }}
                                onChange={this.onChangeFile.bind(this)}/>
                        </React.Fragment>
                        </div>
                </div>
            </div>
            );
    }
}
