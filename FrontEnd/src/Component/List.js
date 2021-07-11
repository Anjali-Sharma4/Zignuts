//
import React from 'react';
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import Toast from 'react-bootstrap/Toast'
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invite:[],
            inviteUpdate: [],
            show: false
        };
    }
    displayAlert=()=>{
    return(
        <Toast onClose={() => this.setState({show :false})} show={this.state.show} delay={3000} autohide>
          <Toast.Header closeButton={false}>
            <strong className="notification">New Invitation </strong>
          </Toast.Header>
        </Toast>
        )
    }
    appendData = () => {

        if(this.state.inviteUpdate.length!==0){
              let popData  = this.state.inviteUpdate.shift()
             this.setState({invite : [...this.state.invite,popData]})
             this.setState({show:true})

        }else{
            clearInterval(this.interval)
        }

    }
    notify = () =>{
      this.interval = setInterval(this.appendData,5000)
    }
    componentDidMount(){
        let invite = "http://localhost:5001/invites?user_id="+localStorage.getItem('user Id')
        let update_invite = "http://localhost:5002/invites?user_id="+localStorage.getItem('user Id')
        let getInvite = axios.get(invite)
        let getInviteUpdate = axios.get(update_invite)
        axios.all([getInvite, getInviteUpdate]).then(
            axios.spread((...allData) =>{
                let inviteData = allData[0]
               let inviteUpdateData = allData[1]
                this.setState({invite: inviteData.data, inviteUpdate:inviteUpdateData.data})
                 this.notify()
            })

        )
    }

    render() {

        return (

            <React.Fragment>

              <Header
              notify={this.displayAlert()}
              />
               <div className="container-fluid">
                  <div className="container">
                        <div className="card mt-5 p-5">
                            <div className="row">
                                <div className="col-lg-10 col-sm-9 col-md-10 col-8">
                                    <h6 className="invitation-head"> Invitations For You</h6>
                                </div>
                                <div className="col-lg-2 col-sm-3 col-md-2 col-4">
                                    <h4 className="invitation-head">{this.displayAlert()}</h4>
                                </div>
                            </div>
                            <div className="invitation-card" >

                           { this.state.invite.map((user) =>(

                              <p className={(user.status==='read' ? "read-invitation-sec":"unread-invitation-sec")}>
                                 Hello {user.sender_id} {user.invite.split(/: |\\n/)[0]}<br/>
                                 {user.invite.split(/: |\\n/)[1]} : <a href={user.invite.split(/: |\\n/)[2]} target="blank"> { user.invite.split(/: |\\n/)[2]}</a>
                                 <br/>Invitation Time : {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(user.invite_time)}
                              </p>

                            )) }
                           </div>
                        </div>
                  </div>

               </div>
               <Footer/>
            </React.Fragment>
        )
    }
}
export default List;