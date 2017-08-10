import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/loading';
import './user-profile.css';

// USER INFO //

import { getUserInfo } from '../../ducks/user';

// FAVORITE RECIPES //

import { getFavoriteRecipes } from '../../ducks/favorite-recipes';
import { removeFromFavoriteRecipes } from '../../services/favorite-recipe-service';

// FAVORITE VIDEOS //

import { getFavoriteVideos } from '../../ducks/favorite-videos';
import { removeFromFavoriteVideos } from '../../services/favorite-video-service';


class UserProfile extends Component {

  constructor(props) {
  super(props);

    this.state = {
      favorites: [],
      videos: []
    }

  }

  componentDidMount() {

  document.body.scrollTop = 0;


  this.props.getUserInfo()

    this.props.getUserInfo().then(() => {
      this.props.getFavoriteRecipes(this.props.userInfo.user_id).then(() => {
        this.setState({favorites: this.props.favRecipes});
      })
      this.props.getFavoriteVideos(this.props.userInfo.user_id).then(() => {
        this.setState({videos: this.props.favVideos});
      })
    })
}


removeFromFavoriteRecipes(i) {
  removeFromFavoriteRecipes(this.state.favorites[i].user_id, this.state.favorites[i].recipe_id);
  this.setState({favorites: [...this.state.favorites.slice(0, i), ...this.state.favorites.slice(i+1)]})
}

removeFromFavoriteVideos(i) {
  removeFromFavoriteVideos(this.state.videos[i].user_id, this.state.videos[i].video_id);
  this.setState({videos: [...this.state.videos.slice(0, i), ...this.state.videos.slice(i+1)]})
}

render() {

if (this.props.loading) {
  return (<Loading />)
}

else {

const favoriteRecipes = this.state.favorites.map((data, i) => (
  <div className="fav-recipes-contain">
    <div className="fav-recipes-items" key={i}>
      <Link id="results-link" to={`/recipe/${data.recipe_id}`}>
        <img id="fav-recipe-photo" src={data.photo} alt="" />
        <h2 id="fav-recipe-title">{data.title}</h2>
      </Link>
      <button id="remove-recipe-from-favorites" onClick={() => {this.removeFromFavoriteRecipes(i)}}>Remove</button>
    </div>
  </div>
))


const favoriteVideos = this.state.videos.map((video, i) => (
  <div className="video-list" key={i}>
    <ul>
      <li id="video-list-item">
        <iframe title="favorite-video" className="iframe" allowFullScreen src={`https://www.youtube.com/embed/${video.video_id}`}></iframe>
        <h1>{video.title}</h1>
        <h2>By</h2>
        <h2>{video.channel}</h2>
        <button id="remove-video-from-favorites" onClick={() => {this.removeFromFavoriteVideos(i)}}>Remove</button>
      </li>
    </ul>
  </div>
))

  return (
    <section id="profile-container">
      <div className="user-contain">
        <div className="user-info">
          <div className="profile-pic-contain"><img className="profile-picture" src={this.props.userInfo.photo} alt="" /></div>
          <h1 className="welcome-message">{this.props.userInfo ? 'Hello, ' + this.props.userInfo.user_first_name + ' ' + this.props.userInfo.user_last_name + '!' : "User info not found"}</h1>
        </div>
      </div>
      { this.state.favorites.length > 0 ? <div>
      <div className="favorite-recipes-title-contain">
        <div className="favorite-recipes-title"><h1>Favorite Recipes</h1></div>
      </div>
      <div className="favorite-contain"> {favoriteRecipes} </div></div>
      : <div id="profile-space-placeholder">Favorite recipes and videos and view them here.</div>}

      {this.state.videos.length > 0 ? <div>
        <div className="favorite-videos-contain">
          <div className="favorite-videos-title"><h1>Favorite Videos</h1></div>
        </div>
        <div className="favorite-contain"> {favoriteVideos} </div></div>
      : null}

    </section>
    )
    }
  }
}

function mapStateToProps(state) {
    return {
      favRecipes: state.favoriteRecipesReducer.favoriteRecipes,
      favVideos: state.favoriteVideosReducer.favoriteVideos,
      userInfo: state.userReducer.userData,
      loading: state.favoriteVideosReducer.loading
    }
  }

export default connect(mapStateToProps, {getUserInfo, getFavoriteRecipes, getFavoriteVideos})(UserProfile);
