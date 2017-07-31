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

    // API CALL WITH RECIPE ID PARAMETERS//

    let { id } = this.props.match.params;
    this.props.getDetails(id);

    // SET STATE WITH INGREDIENTS //

  }


render() {

  if (this.props.loading) {
    return (<Loading />)
  }

  else {

    const Ingredients = this.props.details.ingredients.map((data, i) => {
      return (
        <div className="details-list" key={i}>
          data
        </div>
      )
    })


  return (
    <section id="recipe-details">
      <div className="details-header">
        <h1 id="recipe-title">{this.props.details.title}</h1>
        <img id="recipe-image" src={this.props.details.image_url} alt="" />
      </div>
      <div id="ingredients-list">
        {Ingredients}
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
