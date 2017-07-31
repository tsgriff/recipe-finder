import React, { Component } from 'react';
import { getRecipes } from '../../ducks/search-recipes';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './search-results.css';
import Loading from '../../components/Loading/loading';


class RecipeDetails extends Component {


  componentDidMount() {
    document.body.scrollTop = 0;
  }


render() {

  const Results = this.props.results.map((data, i) => (
       <div className="results-list" key={i}>
       <Link id="results-link" to={`/recipe/${data.recipe_id}`}>
         <img id="results-images" src={data.image_url} alt="N/A" />
          <h3 id="results-titles">{data.title}</h3>
        </Link>
       </div>
     ))

     if (this.props.loading) {
       return (<Loading />)
     }

     else {

  return (
      <section className="search-results">
        <h1 id="results-main-title">Search Results</h1>
        <div className="results-contain">
          {Results}
        </div>
      </section>
    )
  }
}
}

function mapStateToProps(state) {
  return {
    loading: state.recipesReducer.loading,
    results: state.recipesReducer.searchResults,
  }
}

export default connect(mapStateToProps, {getRecipes})(RecipeDetails);
