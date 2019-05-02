import React, { Component } from 'react';
import { addShop } from './UserFunctions'

import './CSS/AddRest.css';
import Mapbox from './Mapbox.js';
// import map from './map.png'


const menu_type_list = ["American", "Korean", "Filipino", "Japanese", "Italian"]


class AddRest extends Component {

	constructor(){
		super()
		this.state = {
			restaurant_name: "",
			restaurant_type: "",
			average_price: "",
			description: "",
			menu_type: "",
			longitude: "",
			latitude: "",
			selectedFile: null
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)

	}

	 onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

	onSubmit(e) {
		e.preventDefault()

		const shop = {
			name: this.state.restaurant_name,
	        avgPrice: this.state.average_price,
	        type: this.state.restaurant_type,
	        location: this.state.longitude +", " + this.state.latitude,
	        description: this.state.description,
	        menu: this.state.menu_type,
	        votes: 0
		}

		addShop(shop).then((err, res) => {
			if(!err){
				alert("Success")
			}else{
				alert("Failed to add Shop")
			}
		})

	}

	handlePhoto = e =>  {
		this.setState({selectedFile: e.target.files[0]})
	}

	// handleUpload = () => {

	// }
	render() {
		return (
		  <div className="AddRest"> 	
		  	
		  	<h1 id="pagename">Add Restaurant</h1>
		  	<br/>
        	<form noValidate onSubmit = {this.onSubmit}>

        	<div id="mapbox-container">
        	<Mapbox id="mapbox"/>
        	</div>

        	<label >Restaurant Name</label><br/>
	  		<input class="text-input" type="text" name = "restaurant_name" value = {this.state.restaurant_name} onChange={this.onChange}/>
	  		<br/>
		  	<label>Restaurant Type</label><br/>
	  		<input class="text-input" type="text" name =  "restaurant_type" value = {this.state.restaurant_type} onChange={this.onChange}/>
	  		<br/>
	  		<label>Average Price</label><br/>
	  		<input class="text-input" type="int" name = "average_price" value = {this.state.average_price} onChange={this.onChange}/>
	  		<br/>
	  		<label>Description</label><br/>
	  		<textarea class="text-input" name = "description" value = {this.state.description} onChange={this.onChange}/>
	  		<br/>
	  		<label>Menu Type</label>
	  		
	  		<div class="dropdown_container">
		  		<select class="dd_button" name = "menu_type" value={this.state.menu_type} onChange={this.onChange}>
		  			{menu_type_list.map(x =>
		  				<option key={x} value={x}>{x}</option>
		  				)};
		  		</select>
	  		</div>

	  		<br/>

	  		<label id="add-photos-label"> Add Photos </label>
	  		
	  		<span id="upload_button" class="button">
				<label>
				<input type="file" ngf-select ng-model="new_files" ng-change="fs.uploadFiles(new_files)" multiple/>
				<span class="dd_button" id="upload-button-text">Upload pictures</span>
				</label>
			</span>
		  	
			

			<input type="submit" value="Submit" class="dd_button" id="submitbutton"/>
		  	</form>



		  	</div>		  	
		  
		);
	}
}

export default AddRest;
