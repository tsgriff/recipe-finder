import React, { Component } from 'react';
import { getTopRecipes } from '../../ducks/top-recipes';
import { connect } from 'react-redux';
import './home.css';
import homePhoto from '../../photos/home-photo.png';
import { Redirect } from 'react-router-dom';
import Loading from '../../components/Loading/loading';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topRecipesOne: [],
      topRecipesTwo: [],
      searchTerm: '',
      shouldRedirect: false,
      displayPrev: false,
      displayNext: true
    }

  this.handleRecipeSearch = this.handleRecipeSearch.bind(this);
  this.searchRecipes = this.searchRecipes.bind(this);

  this.previousPage = this.previousPage.bind(this);
  this.nextPage = this.nextPage.bind(this);

  }

  // GET TRENDING RECIPES //

  componentDidMount() {

  document.body.scrollTop = 0;

  // GET FIRST PAGE OF TOP RECIPES //

  this.props.getTopRecipes(1).then((data) => {

    this.setState({
      topRecipesOne: data.value
    })

  })

  // GET SECOND PAGE OF TOP RECIPES //

  this.props.getTopRecipes(2).then((data) => {

    this.setState({
      topRecipesTwo: data.value
    })

  })

}

componentWillReceiveProps() {
  document.body.scrollTop = 0;
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

  this.setState({
    shouldRedirect: true
  })

}

else {
  alert('Please enter a search term')
}
}

// BUTTONS //

  // PREVIOUS //

previousPage() {

  document.body.scrollTop = 1000;

  this.setState({
    displayPrev: false,
    displayNext: true
  })

}

  // NEXT //

nextPage() {

  document.body.scrollTop = 1000;

    this.setState({
      displayPrev: true,
      displayNext: false
    })
}

// RENDER JSX //

  render() {

    const filter = (str) => {

      const obj = {
      '&amp;': "and",
      '&#8217;': '\'',
      '&#174;': '',
      '&rsquo;': '',
      '&nbsp;': ''
      }

    let filtered = str.replace(/&amp;|&#8217;|&#174;|&rsquo;|&nbsp;/gi, function(matched) {
      return obj[matched];
    });

    return filtered

  }

    if (this.state.shouldRedirect) {
      return <Redirect to={`/recipes/${this.state.searchTerm}`} />
    }

    let resultsArr = null

    if (this.state.displayNext) {
      resultsArr = this.state.topRecipesOne
    }

    if (this.state.displayPrev) {
      resultsArr = this.state.topRecipesTwo
    }

    const results = resultsArr.map((data, i) => (
         <div id="trending-recipes-list" key={i}>
         <Link id="results-link" to={`/recipe/${data.recipe_id}`}>
           <img id="trending-images" src={data.image_url} alt="N/A" />
            <h3 id="trending-recipes-titles">{filter(data.title)}</h3>
            <h3 id="results-rating">Rating: {Math.round(data.social_rank)}</h3>
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
            <input id="search-input" value={this.state.searchTerm} placeholder="Recipe, dish, or ingredient name" onChange={this.handleRecipeSearch}></input>
            <Link id="results-link" to={`/recipes/${this.state.searchTerm}`}>
            <button id="search-button" onClick={this.searchRecipes}>Search</button>
            </Link>
          </div>
        </div>
          <h1 id="trending-title">Top Recipes</h1>
          <div id="trending-recipes">
          {results}
        </div>
        <div className="previous-next-contain-home">
          {this.state.displayPrev ? <button className="previous-button" onClick={this.previousPage}>Previous</button> : null}
          {this.state.displayNext ? <button className="next-button" onClick={this.nextPage}>Next</button> : null}
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
