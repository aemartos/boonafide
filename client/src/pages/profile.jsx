import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPicture } from '../lib/cloudinary';

class _ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
  }
  handleChange(e) {
    this.setState({file: e.target.files[0]});
  }
  handleSubmit(e) {
    e.preventDefault();
    addPicture(this.state.file);
  }
  render() {
    const {user} = this.props;
    return (
      <div className="contentBox">
        <div className="container">
          {user ?
            <div className="profile">
              <h2>Profile</h2>
              <p>Welcome {user.username}</p>
              <img style={{width: "10em"}} src={user.pictureUrl} alt="profile pic"/>
              <form onSubmit={(e)=>this.handleSubmit(e)}>
                <input type="file" onChange={(e)=>this.handleChange(e)} /> <br/>
                <button type="submit">Save new profile picture</button>
              </form>
            </div>
            :
            <p>You r not logged in</p>
          }
      </div>
    </div>
    );
  }
}

export const ProfilePage = connect(store => ({user: store.user}))(withRouter(_ProfilePage));
