import React, { Component } from 'react';
import {Button,ButtonToolbar,MenuItem,DropdownButton} from 'react-bootstrap'
import NavbarBase from "./NavbarBase";
var DatePicker = require("react-bootstrap-date-picker");


var Recaptcha = require('react-recaptcha');


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      action:"signIn",
      captchaToggle:false
    };
    this.changeAction = this.changeAction.bind(this);
    this.callback = this.callback.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.validation = this.validation.bind(this);
  }
  changeAction(){
    var x = (this.state.action =="signUp")?"signIn":"signUp"
    this.setState({action:x})
  }
  callback(){
    
  }
  verifyCallback(){
    this.state.captchaToggle = true;
    
  }
  validation(username,password){
    if(username == "" )
      return "Username is required";
    else if(password == "")
      return "Password is required"
    else if(!this.state.captchaToggle)
      return "Verify user"
    else 
      return ""
  }
  loginSubmit(){
    var username = this.refs.loginUsername.value;
    var password = this.refs.loginPassword.value;
    var message = this.validation(username,password);
    
    if(message != "")
       alert(message);
    else{
      this.refs.loginUsername.value="";
      this.refs.loginPassword.value=""
      this.setState({action:"loader"})
    }
    

  }
  logout(){
    window.location.reload()
  }
  

  render() {
   switch(this.state.action){
    case "signUp":
       return(
      <div className="user">
       <header className="user__header">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg" alt="" />
       <h1 className="user__title">Sign Up</h1>
       </header>
    
       <form className="form">
        <div className="form__group">
            <input type="text" placeholder="Username" className="form__input" />
        </div>
        
        <div className="form__group">
            <input type="email" placeholder="Email" className="form__input" />
        </div>
        
        <div className="form__group">
            <input type="password" placeholder="Password" className="form__input" />
        </div>
           <div className="form__group">
        <DatePicker placeholder="Date of Birth" id="datepicker"/>
        </div>
        <div className="form__group">
         <select id="soft">
           <option>Select an type of user</option>
          <option value="type1">Type 1</option>
          <option value="type2">Type 2</option>
          
        </select>
        </div>
        <br></br>
        
        <Recaptcha
          sitekey="6LduGSwUAAAAALPKPeTjZ0iHKOALkNf_lMesSlLG"
          render="explicit"
          verifyCallback={this.verifyCallback}
          onloadCallback={this.callback}
          
        />
         <br></br>
        <button className="btn" type="button">Register</button>
        
        <Button bsStyle="primary" bsSize="xsmall" onClick={this.changeAction}>Login</Button>
    </form>
    </div>
       )
    case "signIn":
     return(
       <div className="user">
       <header className="user__header">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg" alt="" />
       <h1 className="user__title">Login</h1>
       </header>
       <form className="form">
        <div className="form__group">
            <input type="text" placeholder="Username" ref="loginUsername" className="form__input" />
        </div>
    <div className="form__group">
            <input type="password" ref="loginPassword" placeholder="Password" className="form__input" />
        </div>
        
        <Recaptcha
          ref= "captcha"
          sitekey="6LduGSwUAAAAALPKPeTjZ0iHKOALkNf_lMesSlLG"
          render="explicit"
          verifyCallback={this.verifyCallback}
          onloadCallback={this.callback}
        />
        <br></br>
        <button className="btn" type="button" onClick={this.loginSubmit}>Login</button>
        <br></br>
        <Button bsStyle="primary" bsSize="xsmall" onClick={this.changeAction}>SignUp here</Button>
    </form>
    </div>

     )
  case "dashboard":
    return(
      <div >
        <NavbarBase logout={this.logout}/>
       </div> 
    )
   case "loader":
    return(
      <div class="loading">Loading&#8230;</div>
    )  

    }
 
  }
}

export default App;
