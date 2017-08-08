import React, { Component } from 'react';
import { getUserInfo } from '../../ducks/user';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/loading';
import './user-profile.css';


class UserProfile extends Component {

  constructor(props) {
  super(props);

    this.state = {
      user: {}
    }

  }

  componentDidMount() {

  this.props.getUserInfo()

}

render() {

  if (this.props.loading) {
    return (<Loading />)
  }

  else {

  return (
    <section id="profile-container">
      <div className="user-contain">
        <div className="user-info">
          <div className="profile-pic-contain"><img className="profile-picture" src={this.props.userInfo.photo} /></div>
          <h1 className="welcome-message">{this.props.userInfo ? 'Hello,' + ' ' + this.props.userInfo.user_first_name + ' ' + this.props.userInfo.user_last_name + '!' : "User info not found"}</h1>
        </div>
      </div>
      <div className="favorite-recipes-contain">
        <div className="favorite-recipes-title"><h1>Favorite Recipes</h1></div>
      </div>
      <div className="favorite-videos-contain">
        <div className="favorite-videos-title"><h1>Favorite Videos</h1></div>
      </div>
    </section>
    )
    }
  }
}

function mapStateToProps(state) {
    return {
      userInfo: state.userReducer.userData,
      loading: state.userReducer.loading
    }
  }

export default connect(mapStateToProps, {getUserInfo})(UserProfile);
