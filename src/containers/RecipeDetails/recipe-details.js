import React, { Component } from 'react';
import { getDetails } from '../../ducks/get-details';
import { connect } from 'react-redux';
import './recipe-details.css';
import Loading from '../../components/Loading/loading';


class RecipeDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    }
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
        <h1 id="recipe-title">{this.props.details.title}</h1>
        <img id="recipe-image" src={this.props.details.image_url} alt="" />
      </div>
      <div className="social-ranking">
        <h1>Social Ranking: {Math.round(this.props.details.social_rank)}</h1>
      </div>
      <div id="ingredients-list">
        <h1 id="ingredients-title">Ingredients</h1>
        {Ingredients}
      </div>
      <div id="directions">
        <h1 id="directions-title">Directions</h1>
        <h1><a id="recipe-source-referral" href={this.props.details.source_url} target="_blank" rel="noopener noreferrer">Click here for cooking directions from {this.props.details.publisher}</a></h1>
      </div>
    </section>
  )
}
}

}

function mapStateToProps(state) {
  return {
    loading: state.detailsReducer.loading,
    details: state.detailsReducer.recipeDetails
  }
}

export default connect(mapStateToProps, {getDetails})(RecipeDetails);
