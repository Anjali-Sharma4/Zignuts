import React from 'react';
class Header extends React.Component {
constructor(props) {
    super(props);
    this.state = {

    };
  }

    handleLogout = () => {
        console.log("logout")
           localStorage.clear();
           window.location.href = '/'
    }

  render() {

    return (
      <header>
        <div className="head-orange">
        <div className="container-fluid">
            <div className="container">
                <div className="row logout">
                    {localStorage.getItem('token') ?
                    <p onClick={() => {this.handleLogout()}}>Logout</p>
                    :
                    <p></p>
                    }
                </div>
            </div>
        </div>
        </div>


      </header>
    );
  }
}
export default Header;