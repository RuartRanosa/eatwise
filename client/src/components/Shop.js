import React, { Component } from 'react'
import SearchShop from './SearchShop'
import mapboxgl from 'mapbox-gl'
import Mapbox from './Mapbox.js';
import StarRatingComponent from 'react-star-rating-component';
import { rate } from './UserFunctions.js'


import blankavatar from '../pictures/blankavatar.png'; 
import pic1 from '../pictures/pic1.jpg' 
import pic2 from '../pictures/pic2.jpg' 
import pic3 from '../pictures/pic3.jpg' 
import pic4 from '../pictures/pic4.jpg' 
import map1 from '../pictures/losbanos.png'

import './CSS/Shop.css';
import elementType from 'prop-types-extra/lib/elementType';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

import jwt_decode from 'jwt-decode'

const qs = require("query-string")

class Shop extends Component {
    constructor() {
        super()
        this.state = {
            userId: -1,
            name: "",
            shopId: 0,
            avgPrice: "",
            type: "",
            location: "",
            description: "",
            menu: "",
            votes: 0 ,
            comment: ""  
        }
        this.onChange = this.onChange.bind(this)
        this.onStarClick = this.onStarClick.bind(this)
        this.submitRating = this.submitRating.bind(this)

    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onStarClick(nextValue, prevValue, name){
      console.log(nextValue)
      this.setState({votes: nextValue})
    }

    submitRating(e){
      e.preventDefault()
      if(this.state.userId > -1){
        console.log(this.state.votes)
        const rating = {
          userId: this.state.userId,
          shopId: this.state.shopId,
          comment: this.state.comment,
          votes: this.state.votes
        }

        rate(rating).then((res) => {
          if(res){
            alert("Rating completed")
          }else{
            alert("Failed")
          }
        })
      }else{
        alert("Not Logged in. Cannot make a review")
      }
    }
    

    componentDidMount(){
        var shopName = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).shopName
        var id = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).shopId
        console.log(qs.parse(this.props.location.search, {ignoreQueryPrefix: true}))
        this.setState({name: shopName})
        this.setState({id: id})
        fetch('http://localhost:2019/search-shop/?name='+shopName+"&id="+id)
            .then((response) => { return response.json() })
            .then((result) => {
                console.log(result)
                this.setState({avgPrice: result[0].avgPrice})
                this.setState({type: result[0].type})
                this.setState({location: result[0].location})
                this.setState({description: result[0].description})
                this.setState({menu: result[0].menu})
                this.setState({votes: result[0].votes})
                this.setState({shopId: id})
            })
            .catch((e) => { console.log(e)});   
        if(localStorage.usertoken){
          var token = localStorage.usertoken
          var decoded = jwt_decode(token)
          this.setState({
              userId: decoded.userId
          })     
        }
    }

    //reloads page when new data arrives
    componentWillReceiveProps(nextProps){
           window.location.reload()
    }
 
    render () {
        return (
            <div className="App">

          <body className="App-body">
            <div className="">
                <div className="">
                   
                    <div className="">
                         <div className="avatarContainer">
                            <img src={blankavatar} className="blankavatar" />
                        </div>
                        <div className="resName">
                            <h2>*name of restaurant*</h2>
                            <h1><StarRatingComponent
                                  starCount = {5}
                                  id = "rate-this-interactive" 
                                  value = {this.state.votes}
                                />
                        </h1>    
                        </div>
                    </div>
                </div>
            </div>

            


            <div className="commentContainer">
                <div className="rating">
                  <h3> Rate this restaurant! </h3>
                  <h1><StarRatingComponent
                        editing = {true}
                        id = "rate-this-interactive" 
                        value = {this.state.votes}
                        onStarClick={this.onStarClick.bind(this)}
                      /></h1>
                </div>
              <Form>
                  <Form.Group controlId="comment">
                      <Form.Control componentClass="textarea" style={{ height: 80 }} placeholder="Add a comment..." 
                        name="comment"
                        value={this.state.comment}
                        onChange={this.onChange}
                      />
                      <div className="commentButton">
                  <Button variant="warning" onClick = {this.submitRating}> Submit Rating </Button>
                      </div>
                  </Form.Group>
              </Form>
            </div>
          </body>
      </div>

        )
    }
}

{/*
    View url content
    <td>{console.log(this.props)}</td>
    <td>{console.log(qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).shopName)}</td>
*/}


export default Shop