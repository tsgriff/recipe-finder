import React, { Component } from 'react';
import { getDetails } from '../../ducks/get-details';
import { getUserInfo } from '../../ducks/user';
import { addToFavoriteRecipes } from '../../services/favorite-recipe-service';
import { connect } from 'react-redux';
import './recipe-details.css';
import Loading from '../../components/Loading/loading';
import Notes from '../Notes/notes';



class RecipeDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    }
    this.addToFavoriteRecipes = this.addToFavoriteRecipes.bind(this);
  }

  componentDidMount() {
    document.body.scrollTop = 0;

    // API CALL WITH RECIPE ID AS PARAMETER//

    let { id } = this.props.match.params;

    this.props.getDetails(id).then((data) => {

    // SET STATE WITH INGREDIENTS //

      let ingredientsArr = []

      this.props.details.ingredients.map((data, i) => {
        return ingredientsArr.push(data);
      })

    this.setState({
      ingredients: ingredientsArr
    })
  })
}

addToFavoriteRecipes(event) {
  event.preventDefault();

  let { id } = this.props.match.params;

  addToFavoriteRecipes(this.props.userInfo.user_id, id, this.props.details.title, this.props.details.image_url);

}


render() {

  if (this.props.loading) {
    return (<Loading />)
  }

  else {

    const Ingredients = this.state.ingredients.map((data, i) => {
      return (
        <ul key={i}>
          <li className="ingredients">
            {data}
          </li>
        </ul>
      )
    })

  return (
    <section id="recipe-details">
      <div className="details-header">
        <img id="recipe-image" src={this.props.details.image_url} alt="" />
        <h1 id="recipe-title">{this.props.details.title}</h1>
      </div>
      <div className="social-ranking">
        <h1>Social Ranking: {Math.round(this.props.details.social_rank)}</h1>
      </div>
      <div id="add-to-favs-contain"><button id="add-to-favs" onClick={this.addToFavoriteRecipes}>Favorite</button></div>
      <div id="ingredients-and-directions-contain">
        <div id="ingredients-list">
          <h1 id="ingredients-title">Ingredients</h1>
          {Ingredients}
        </div>
        <div id="directions">
          <h1 id="directions-title">Directions</h1>
          <h1><a id="recipe-source-referral" href={this.props.details.source_url} target="_blank" rel="noopener noreferrer">Click here for cooking directions from {this.props.details.publisher}</a></h1>
        </div>
      </div>
      <div className="notes-divider">
        <h1 id="notes-title">Notes</h1>
      </div>
      <Notes />
    </section>
  )
}
}

}

function mapStateToProps(state) {
  return {
    userInfo: state.userReducer.userData,
    loading: state.detailsReducer.loading,
    details: state.detailsReducer.recipeDetails
  }
}

export default connect(mapStateToProps, {getDetails, addToFavoriteRecipes, getUserInfo})(RecipeDetails);
