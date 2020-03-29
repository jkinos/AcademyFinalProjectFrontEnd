import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';


class ImageUpload extends Component {
    constructor(props){
        super(props);
        this.state = {
            success : false,
            url : ""
        }
    }

    handleChange = (ev) => {
        this.setState({success: false, url : ""});

    }

    handleUpload = (ev) => {

        const file = this.uploadInput.files[0];
        const fileParts = this.uploadInput.files[0].name.split('.');
        const fileName = fileParts[0]
        const fileType = fileParts[1];
        const recipe_name = this.props.recipeName
        console.log(recipe_name)
        console.log("Preparing the upload");
        axios.post("https://uk5p4uqkgi.execute-api.eu-west-1.amazonaws.com/dev/requestUploadURL",{
            fileType : fileType
        })
            .then(response => {

                const returnData = response.data;
                const signedRequest = returnData.uploadURL;
                console.log(returnData)
                const dataParts = signedRequest.split('?');
                const url = dataParts[0]
                this.setState({url: url})
                console.log(this.props.value)
                console.log("Recieved a signed request " + signedRequest);
                const options = {
                    headers: {
                        'Content-Type': fileType
                    }
                };

                axios.put(signedRequest,file,options)
                    .then(result => {
                        console.log("Upload completed")
                        this.setState({success: true});
                    })
                    .catch(error => {
                        alert("ERROR " + JSON.stringify(error));
                    })
            })
            .catch(error => {
                alert(JSON.stringify(error));
            })
    }


    render() {
        const ThumbImage = () =>(
            <div style={{paddingTop:20,paddingBottom:30}}>
                <img style={{width:'70px'}} src={this.state.url} alt="recipeImage"/>
                <br/>
            </div>
        )
        return (
            <div>
                {this.state.success ? <ThumbImage/> : null}
                <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
                <br/>
                <Button style={{marginTop: 15,marginBottom:15}} onClick={this.handleUpload}>Lataa</Button>
            </div>
        );
    }
}
export default ImageUpload;
