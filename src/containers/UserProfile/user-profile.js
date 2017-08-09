import React, { Component } from 'react';
import { getUserInfo } from '../../ducks/user';
import { getFavoriteRecipes } from '../../ducks/favorite-recipes';
import { removeFromFavoriteRecipes } from '../../services/favorite-recipe-service';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/loading';
import './user-profile.css';


class UserProfile extends Component {

  constructor(props) {
  super(props);

    this.state = {
      user: {},
      favorites: []
    }

  }

  componentDidMount() {

    this.props.getUserInfo().then(() => {
      this.props.getFavoriteRecipes(this.props.userInfo.user_id).then(() => {
        this.setState({favorites: this.props.favRecipes});
      })
    })
}


removeFromFavoriteRecipes(i) {
  removeFromFavoriteRecipes(this.state.favorites[i].user_id, this.state.favorites[i].recipe_id);
  this.setState({favorites: [...this.state.favorites.slice(0, i), ...this.state.favorites.slice(i+1)]})
  console.log(this.state.favorites[i].title, " REMOVED");
}

render() {

  if (this.props.loading) {
    return (<Loading />)
  }

  else {

    const favoriteRecipes = this.state.favorites.map((data, i) => (
           <div className="fav-recipes-contain">
             <div className="fav-recipes-items" key={i}>
              <img id="fav-recipe-photo" src={data.photo} />
               <h2 id="fav-recipe-title">{data.title}</h2>
               <div className="fav-recipe-details">
               <button id="remove-recipe-from-favorites" onClick={() => {this.removeFromFavoriteRecipes(i)}}>Remove</button>
              </div>
               </div>
              </div>
        ))

  return (
    <section id="profile-container">
      <div className="user-contain">
        <div className="user-info">
          <div className="profile-pic-contain"><img className="profile-picture" src={this.props.userInfo.photo} /></div>
          <h1 className="welcome-message">{this.props.userInfo ? 'Hello, ' + this.props.userInfo.user_first_name + ' ' + this.props.userInfo.user_last_name + '!' : "User info not found"}</h1>
        </div>
      </div>
      <div className="favorite-recipes-title-contain">
        <div className="favorite-recipes-title"><h1>Favorite Recipes</h1></div>
      </div>
      <div className="favorite-contain">{favoriteRecipes}</div>
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
      favRecipes: state.favoriteRecipesReducer.favoriteRecipes,
      userInfo: state.userReducer.userData,
      loading: state.userReducer.loading
    }
  }

export default connect(mapStateToProps, {getUserInfo, getFavoriteRecipes})(UserProfile);
