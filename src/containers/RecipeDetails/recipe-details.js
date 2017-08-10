import React, { Component } from 'react';
import { getDetails } from '../../ducks/get-details';
import { getUserInfo } from '../../ducks/user';
import { addToFavoriteRecipes } from '../../services/favorite-recipe-service';
import { connect } from 'react-redux';
import './recipe-details.css';
import Loading from '../../components/Loading/loading';

// NOTES //
import { addNote, removeNote } from '../../services/notes-service';
import { getNotes } from '../../ducks/notes';



class RecipeDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      notes: '',
      notesList: []
    }

    this.addToFavoriteRecipes = this.addToFavoriteRecipes.bind(this);

    this.handleNotes = this.handleNotes.bind(this);
    this.storeNotes = this.storeNotes.bind(this);

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

  // GET NOTES //

  this.props.getUserInfo().then(() => {
    let { id } = this.props.match.params;
    this.props.getNotes(this.props.userInfo.user_id, id).then(() => {
      this.setState({notesList: this.props.notes})
    })
  })

}

// ADD FAVORITE RECIPE //

addToFavoriteRecipes(event) {
  event.preventDefault();

  let { id } = this.props.match.params;

  addToFavoriteRecipes(this.props.userInfo.user_id, id, this.props.details.title, this.props.details.image_url);

}

handleNotes(event) {
  this.setState({
    notes: event.target.value,
  })
}

storeNotes(event) {

event.preventDefault();

if (this.state.notes) {

  let { id } = this.props.match.params;

  addNote(this.props.userInfo.user_id, id, this.state.notes).then(() => {
        this.props.getNotes(this.props.userInfo.user_id, id).then(() => {
          this.setState({notesList: this.props.notes});
      })
  })
}

  else {
    alert('Please enter notes')
  }
}

// REMOVE NOTES //

  removeNote(i) {

    let { id } = this.props.match.params;

    removeNote(this.props.userInfo.user_id, id, this.state.notesList[i].note_id);
    this.setState({notesList: [...this.state.notesList.slice(0, i), ...this.state.notesList.slice(i+1)]})

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

    const notes = this.state.notesList.map((note, i) => {
      return (
        <div id="notes-list-contain">
        <li key={i} className="notes-list">
          {note.notes}
          <button id="remove-note" onClick={() => {this.removeNote(i)}}>X</button>
        </li>
        </div>
      )
    })

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

  return (
    <section id="recipe-details">
      <div className="details-header">
        <img id="recipe-image" src={this.props.details.image_url} alt="" />
        <h1 id="recipe-title">{this.props.details.title ? filter(this.props.details.title) : null}</h1>
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
          <h1><a id="recipe-source-referral" href={this.props.details.source_url} target="_blank" rel="noopener noreferrer">Click here for cooking directions from {this.props.details.publisher} and store them below.</a></h1>
        </div>
      </div>
      <div className="notes-divider">
        <h1 id="notes-title">Notes</h1>
      </div>
      <section id="notes">
        <div id="notes-contain"><h1 id="note-item-text"><ul>{notes}</ul></h1>
          <textarea id="notes-input" placeholder="Save directions, modify ingredients and/or instructions, etc." onChange={this.handleNotes}></textarea>
        </div>
        <div id="notes-button-contain">
          <button id="notes-button" onClick={this.storeNotes}>Submit</button>
        </div>
      </section>
    </section>
  )
}
}

}

function mapStateToProps(state) {
  return {
    userInfo: state.userReducer.userData,
    loading: state.detailsReducer.loading,
    details: state.detailsReducer.recipeDetails,
    notes: state.notesReducer.notes
  }
}

export default connect(mapStateToProps, {getDetails, addToFavoriteRecipes, getUserInfo, getNotes})(RecipeDetails);
