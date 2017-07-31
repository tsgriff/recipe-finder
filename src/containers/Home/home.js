import React, { Component } from 'react';
import { getTopRecipes } from '../../ducks/top-recipes';
import { getRecipes } from '../../ducks/search-recipes';
import { connect } from 'react-redux';
import './home.css';
import _ from 'lodash';
import homePhoto from '../../photos/home-photo.png';
import { Redirect } from 'react-router-dom';
import Loading from '../../components/Loading/loading';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingRecipes: [],
      searchTerm: '',
      shouldRedirect: false,
    }

  this.handleRecipeSearch = this.handleRecipeSearch.bind(this);
  this.searchRecipes = this.searchRecipes.bind(this);

  }

  // GET TRENDING RECIPES //

  componentDidMount() {

  document.body.scrollTop = 0;

  this.props.getTopRecipes().then((data) => {

  let obj = this.props.featured;
  let arr = _.values(obj);

    this.setState({
      trendingRecipes: arr[1]
    })
  })
}

// SEARCH //

handleRecipeSearch(event) {
  this.setState({
    searchTerm: event.target.value,
  })
}

searchRecipes(event) {
  event.preventDefault();

  if (this.state.searchTerm) {

  this.props.getRecipes(this.state.searchTerm);

  this.setState({
    shouldRedirect: true
  })
}

else {
  alert('Please enter a search term')
}

}

// RENDER JSX //


  render() {

    if (this.state.shouldRedirect) {
      return <Redirect to="/recipes" />
    }

    const Trending = this.state.trendingRecipes.map((data, i) => (
         <div className="trending-recipes-list" key={i}>
         <Link id="results-link" to={`/recipe/${data.recipe_id}`}>
           <img id="trending-images" src={data.image_url} alt="N/A" />
            <h3 id="trending-recipes-titles">{data.title}</h3>
          </Link>
         </div>
       ))

       if (this.props.loading) {
         return (<Loading />)
       }

    return (
      <section className="Home">
        <div className="Home-header">
          <img id="home-photo" src={homePhoto} alt="" />
          <h1>Taylor and Claire's <br /> Recipe Finder</h1>
        </div>
        <div className="recipe-search">
          <div className="search-contain">
            <h1 id="search-recipes">Search Recipes</h1>
            <input id="search-input" value={this.state.searchTerm} onChange={this.handleRecipeSearch}></input>
            <button id="search-button" onClick={this.searchRecipes}>Search</button>
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

export default connect(mapStateToProps, {getTopRecipes, getRecipes})(Home);
