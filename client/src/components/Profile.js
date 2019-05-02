import React, {Component } from 'react'
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import SearchShop from './SearchShop'
import AddShop from './AddShop'
import AddRest from './AddRest'
import './CSS/Profile.css';
import ppic from '../pictures/img_avatar.png'
import Files from 'react-files'


class Profile extends Component {
    constructor() {
        super()
        this.state = {
            userId: 0,
            adminAccess: false,
            username: '',
            display_name: '',
            email: '',
            shop: [],
            shopName: "",
            showAdminTools: false,
            showAddShop: false,
            location: ""
        }

        this.addShop = this.addShop.bind(this)
                this.onFilesChange = this.onFilesChange.bind(this)

    }
  onFilesChange(files) {
    console.log(files)
  }

    componentDidMount () {
        if(localStorage.usertoken){
            var token = localStorage.usertoken
            var decoded = jwt_decode(token)
            this.setState({
                userId: decoded.userId,
                username: decoded.username,
                display_name: decoded.display_name,
                email: decoded.email,
                adminAccess: decoded.adminAccess
            })
        }
    }
    
    addShop(){
        if(this.state.showAddShop === false){
            this.setState({showAddShop: true})
            console.log(this.state.showAddShop)
        }else{
            this.setState({showAddShop: false})
            console.log(this.state.showAddShop)
        }
    }


    render () {
        {if(this.state.showAddShop){
            var shop = (
                <AddRest/>
            )
         } 
   
        }
        return (
                 
            <div className="pdiv">
                <img src={require("../pictures/img_avatar.png")} className="profile-pic"/>
                    <table className="ptable">
                    <tr>{this.state.username}</tr>
                        <tr className="ptr">
                            <td>{this.state.display_name}</td>
                        </tr>
                        <tr className="ptr">
                            <td>{this.state.email}</td>
                        </tr>
                        <tr><td><br/></td></tr>
                        <tr className="ptr">
                            <td>
                               {this.state.adminAccess ? <button class= "btn btn-danger"onClick = {this.addShop}>Add Shop</button>: null}
                            </td>
                        </tr>
                    </table>
               

                {shop}
                <SearchShop/>


            </div>
        )
    }
}

export default Profile