import React, { Component } from 'react'
import { login } from './UserFunctions'
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'
import './CSS/Login.css'
class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then((res) => {
            if(res){
                this.props.history.push(`/profile`)
            }else{
                alert("Login Failed. Try again")
                console.log(res)
            }
        })
    }

    render () {
        return (
              <form className = "App" noValidate onSubmit={this.onSubmit}>  
                <table>
                    <tr>
                        <td class="row1">Email</td>
                        <td class="row1">Password</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="email" class="inputtext"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.onChange}></input>
                        </td>
                        <td>
                            <input type="password" class="inputtext"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onChange}></input>
                        </td>
                        <td>
                            <Button type="submit" className="header-button">Login</Button>
                        </td>
                        <Link to="/register"><Button className="header-button"> Sign-up</Button> </Link>
                    </tr>
                    <tr>
                        
                    </tr>
                    </table>
                  </form>      
                
        )
    }
}

export default Login