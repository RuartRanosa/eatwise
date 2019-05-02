import React, { Component } from 'react'
import dropdownMenu from '../pictures/dropdown.png';
// import './../App.css';
import "./CSS/Navbar.css"
import logo from '../pictures/logo2.png';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

class Navbar extends Component {
    logOut (e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }

    render () {
        {/*==================== Content of menu changes depending if user is logged in or not ====================*/}
        const loginRegLink = (
            <div className="header">
                <table>
                    <tr><p></p></tr>
                    <tr>
                        <td>
                            <Login history = {this.props.history}/>
                        </td>
                    </tr>
                 </table>   
             </div>           
            
            
        )

        const userLink = (
            <div className="header">
                <table>
                    <tr><p></p></tr><tr>
                    <td>
                        <Link to="/profile">
                            <Button className="header-button"> Profile </Button>
                        </Link>
                    </td>
                    <td>
                        <Link to="" onClick={this.logOut.bind(this)}>
                            <Button className="header-button">Logout</Button>
                        </Link>
                    
                    </td>
                    </tr>

                 </table>   
             </div>           
        )
        {/*=======================================================================================================*/}
        return (
            <header className="App-header">
                <div className="clogo">
                    <Link to="/">
                        <img src={logo} className="logopic" />
                    </Link> 
                </div>
                {localStorage.usertoken ? userLink : loginRegLink}
            </header>
        )
    }
}

export default withRouter(Navbar)
