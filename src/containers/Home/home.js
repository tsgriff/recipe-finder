import React, { Component } from 'react';
import { getTopRecipes } from '../../ducks/top-recipes';
import { connect } from 'react-redux';
import './home.css';
import _ from 'lodash';
import homePhoto from '../../photos/home-photo.png';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingRecipes: []
    }
  }

  // GET TRENDING RECIPES //

  componentDidMount() {

  this.props.getTopRecipes().then((data) => {

  var obj = this.props.featured;
  var arr = _.values(obj);

    this.setState({
      trendingRecipes: arr[1]
    })
  })
}

// RENDER JSX //

  render() {

    const Trending = this.state.trendingRecipes.map((data, i) => (
         <div className="trending-recipes-list" key={i}>
           <img id="trending-images" src={data.image_url} alt="N/A" />
            <h3 id="trending-recipes-titles">{data.title}</h3>
         </div>
       ))

    return (
      <section className="Home">
        <div className="Home-header">
          <img id="home-photo" src={homePhoto} alt="" />
          <h1>Taylor and Claire's <br /> Recipe Finder</h1>
        </div>
        <div className="recipe-search">
          <div className="search-contain">
            <h1 id="search-recipes">Search Recipes</h1>
            <input id="search-input"></input>
            <button id="search-button">Search</button>
          </div>
        </div>
          <h1 id="trending-title">Top Recipes</h1>
          <div className="trending-recipes">
          {Trending}
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.topRecipesReducer.loading,
    featured: state.topRecipesReducer.topRecipes
  }
}

export default connect(mapStateToProps, {getTopRecipes})(Home);
