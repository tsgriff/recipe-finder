import React, { Component } from 'react';
import { getRecipes } from '../../ducks/search-recipes';
import { getRecipesPageTwo } from '../../ducks/search-recipes-second';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { videoSearch } from '../../ducks/youtube';
import './search-results.css';
import Loading from '../../components/Loading/loading';


class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      displayPrev: false,
      displayNext: true
    }

  this.previousPage = this.previousPage.bind(this);
  this.nextPage = this.nextPage.bind(this);

  }

  componentDidMount() {
    document.body.scrollTop = 0;

  // API CALLS USING URL PARAMS //

    const { term } = this.props.match.params;

  // CALL FIRST PAGE OF RECIPES //

    this.props.getRecipes(term).then((data) => {

      let resultsArr = []

      this.props.results.map((data, i) => {
        return resultsArr.push(data);
      })

      this.setState({
        searchResults: resultsArr
      })

    })

  // CALL SECOND PAGE OF RECIPES //

    this.props.getRecipesPageTwo(term)

  // CALL YOUTUBE API //
    this.props.videoSearch(term + " recipe");

  }

  previousPage() {

    let resultsArr = []

    this.props.results.map((data, i) => {
      return resultsArr.push(data);
    })

    this.setState({
      searchResults: resultsArr,
      displayPrev: false,
      displayNext: true
    })


    document.body.scrollTop = 0;

    }

  nextPage() {

  document.body.scrollTop = 0;

  const { term } = this.props.match.params;

  // UPDATE RECIPE STATE ON "NEXT" //

    let secondPageArr = []

    this.props.pageTwo.map((data, i) => {
      return secondPageArr.push(data);
    })

    this.setState({
      searchResults: secondPageArr,
      displayPrev: true,
      displayNext: false
    })

}

render() {


  const Results = this.state.searchResults.map((data, i) => (

       <div className="results-list" key={i}>
       <Link id="results-link" to={`/recipe/${data.recipe_id}`}>
         <img id="results-images" src={data.image_url} alt="N/A" />
          <h3 id="results-titles">{data.title}</h3>
          <h3 id="results-rating">Rating: {Math.round(data.social_rank)}</h3>
        </Link>
       </div>
     )
   )

     const videoResults = this.props.videos.map((video, i) => (
       <div className="video-list" key={i}>
         <ul>
           <li className="video-list-item">
            <iframe className="iframe" allowFullScreen src={`https://www.youtube.com/embed/${video.id.videoId}`}></iframe>
            <h1>{video.snippet.title}</h1>
            <h2>By</h2>
            <h2>{video.snippet.channelTitle}</h2>
            <h3 className="video-description">{video.snippet.description}</h3>
           </li>
         </ul>
       </div>
     ))

     if (this.props.loading || this.props.videoLoading) {
       return (<Loading />)
     }

     else {

  return (
      <section className="search-results">
        <h1 id="results-main-title">Search Results for "{this.props.match.params.term}"</h1>
        <div className="results-contain">
          {this.props.pageTwoLoading ? <Loading /> : Results}
        </div>
        <div className="previous-next-contain-results">
          {this.state.displayPrev ? <button className="previous-button" onClick={this.previousPage}>Previous</button> : null}
          {this.state.displayNext ? <button className="next-button" onClick={this.nextPage}>Next</button> : null}
        </div>
        <div id="video-section-title-contain">
          <h1 id="video-results-title">Videos</h1>
        </div>
        <div className="videos-contain">
          {videoResults}
        </div>
        <div className="previous-next-contain-youtube">
          <button className="previous-button" onClick={this.youtubePrevious}>Previous</button>
          <button className="next-button" onClick={this.youtubeNext}>Next</button>
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
    pageTwo: state.recipesSecondReducer.searchResultsSecond,
    pageTwoLoading: state.recipesSecondReducer.loading,
    videos: state.youtubeReducer.videos,
    videoLoading: state.youtubeReducer.loading
  }
}

export default connect(mapStateToProps, {getRecipes, videoSearch, getRecipesPageTwo})(SearchResults);
