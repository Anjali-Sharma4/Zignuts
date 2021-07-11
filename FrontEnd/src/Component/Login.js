import React from 'react';
import Header from './Header'
import Footer from './Footer'

var CryptoJS = require("crypto-js");
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    email:'',
    password:'',
    isLogged: false,
    };
  }

 handleChange = (event) =>{
    const { name, value } = event.target;
    this.setState({[name]: value});
    };

 handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
            isLogged: true
          });
    console.log("submit :",this.state)
        fetch("http://localhost:5000/users?email="+this.state.email+"&password="+this.state.password)
        .then((data) =>{
         data.json().then((resp) =>{
         console.log("resp : ",resp)
             if(resp.length > 0){
                 let password = CryptoJS.SHA1(resp[0].password).toString();
                 localStorage.setItem('token', password,);
                 localStorage.setItem('user Id', resp[0].user_id);
                 window.location.href = '/list'
             }
             else{
             alert("Please Enter Correct Email And Password")
             }
         })
        })
 }

  render() {
    return (
    <React.Fragment>
    <Header isLogged={this.state.isLogged}/>
      <div className="container-fluid">
        <div className="container">
            <div className="card  p-5 new-card">
            <div className="row">
                <div className="col-lg-1 col-md-1 col-sm-hidden col-hidden"></div>
                    <div className="col-lg-10 col-md-10 col-sm-12 col-12">
                        <h3 className="login-text"> Login</h3>
                        <form className="form-sec" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="email"  className="form-control form-control-sm" placeholder="Enter Your Email" name="email" onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control form-control-sm" placeholder="Enter Your Password" name="password"  onChange={this.handleChange}/ >
                            </div>
                             <div className="row">
                                <div className="col-lg-12">
                                    <button className="btn btn-primary"  style={{'width':'100%'}}> Submit</button>
                                </div>
                             </div>
                        </form>
                    </div>
                <div className="col-lg-1 col-md-1 col-sm-hidden col-hidden"></div>
            </div>
            </div>
        </div>
      </div>
    <Footer/>
    </React.Fragment>
    );
  }
}
export default Login;



