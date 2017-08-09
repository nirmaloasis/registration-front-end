import React, { Component } from 'react';
import {Button,ButtonToolbar,MenuItem,DropdownButton} from 'react-bootstrap'
import NavbarBase from "./NavbarBase";
import axios from 'axios'
var DatePicker = require("react-bootstrap-date-picker");
var Recaptcha = require('react-recaptcha');


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      action:"signIn",
      captchaToggle:false,
      enableVerification:false
    };
    this.changeAction = this.changeAction.bind(this);
    this.callback = this.callback.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.validation = this.validation.bind(this);
    this.signUp = this.signUp.bind(this);
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
  signUp(){
   var username = this.refs.signUpusername.value;
    var password = this.refs.signUppassword.value;
    var email = this.refs.signUpemail.value;
    var dob = this.refs.signUpdob.value;
    var roleType = this.refs.roleType.value;
     this.setState({action:"loader"})
     var message = this.validation(username,password);
     if(message != "")
       alert(message);
    else{
      axios.post('localhost:9000/enroll', {
        username:username,
        password:password,
        email:email,
        dob:dob,
        role:roleType
      })
      .then(function (response) {
        if(response.data.enabled == 2){
          alert("This username exists")
          update({action:"signUp"})
        }
        else{
          update({action:"dashboard",enableVerification:""+response.data.enabled})
        }

      })
      .catch(function (error) {
        console.log(error);
      });
    }

  }
  loginSubmit(){
    var username = this.refs.loginUsername.value;
    var password = this.refs.loginPassword.value;
    var update = this.setState.bind(this);
    var message = this.validation(username,password);
    this.setState({action:"loader"})
    if(message != "")
       alert(message);
    else{
      this.refs.loginUsername.value="";
      this.refs.loginPassword.value=""
       axios.post('localhost:9000/login', {
        username:username,
        password:password
      })
      .then(function (response) {
        if(response.data != "failure")
          update({action:"dashboard",enableVerification:response.data})
        else{
          alert("Incorrect username and password");
          update({action:"signIn"})
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
            <input type="text" ref="signUpusername" placeholder="Username" className="form__input" />
        </div>
        
        <div className="form__group">
            <input type="email" ref="signUpemail" placeholder="Email" className="form__input" />
        </div>
        
        <div className="form__group">
            <input type="password" ref="signUppassword" placeholder="Password" className="form__input" />
        </div>
           <div className="form__group">
        <DatePicker placeholder="Date of Birth" ref="signUpdob" id="datepicker"/>
        </div>
        <div className="form__group" ref="roleType">
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
        <button className="btn" type="button" onClick={this.signUp}>Register</button>
        
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
        <br></br>
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
        {(this.state.enableVerification == "0")?<label className="btn"  >you need to verify your email</label>:<div></div>}
       </div> 
    )
   case "loader":
    return(
      <div>
               <div className="loader"></div>
               <div id="loaderText">Loading Data for you .....</div>
        </div>
    )  

    }
 
  }
}

export default App;
