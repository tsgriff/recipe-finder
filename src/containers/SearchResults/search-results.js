import React, { Component } from 'react';
import { getRecipes } from '../../ducks/search-recipes';
import { getUserInfo } from '../../ducks/user';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { videoSearch } from '../../ducks/youtube';
import './search-results.css';
import Loading from '../../components/Loading/loading';
import { addToFavoriteVideos } from '../../services/favorite-video-service';


class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResultsOne: [],
      searchResultsTwo: [],
      displayPrev: false,
      displayNext: false,
      videoArr: [],
      videoPrevToken: '',
      videoNextToken: '',
      youtubePrevious: false,
      youtubeNext: true
    }

  this.previousPage = this.previousPage.bind(this);
  this.nextPage = this.nextPage.bind(this);

  this.youtubePrevious = this.youtubePrevious.bind(this);
  this.youtubeNext = this.youtubeNext.bind(this);

  }

  componentDidMount() {
    document.body.scrollTop = 0;

  // API CALLS USING URL PARAMS //

    const { term } = this.props.match.params;

  // CALL FIRST PAGE OF RECIPES //

    this.props.getRecipes(term, 1).then((data) => {

      this.setState({
        searchResultsOne: data.value
      })

    })

  // CALL SECOND PAGE OF RECIPES //

    this.props.getRecipes(term, 2).then((data) => {

      this.setState({
        searchResultsTwo: data.value
      })

      if (this.state.searchResultsTwo.length > 0) {
        this.setState({
          displayNext: true
        })

      }

    })


  // CALL YOUTUBE API //

    this.props.videoSearch(term + " recipe", '').then((data) => {
      this.setState({
        videoArr: data.value.items,
        videoNextToken: data.value.nextPageToken
      })
    });

  }


  previousPage() {

  document.body.scrollTop = 0;

    this.setState({
      displayPrev: false,
      displayNext: true
    })

    }

  nextPage() {

  document.body.scrollTop = 0;

    this.setState({
      displayPrev: true,
      displayNext: false
    })

}

// YOUTUBE SEARCH RESULTS BUTTONS //

youtubePrevious() {

  const { term } = this.props.match.params;

  this.props.videoSearch(term + " recipe", this.state.videoPrevToken).then((data) => {

    this.setState({
      videoArr: data.value.items,
      videoNextToken: data.value.nextPageToken,
      videoPrevToken: data.value.prevPageToken
    })
  })

  if (this.state.videoPrevToken === 'CAIQAQ') {
    this.setState({
      youtubePrevious: false
    })
  }

}

youtubeNext() {

  const { term } = this.props.match.params;

  this.props.videoSearch(term + " recipe", this.state.videoNextToken).then((data) => {

    this.setState({
      youtubePrevious: true,
      videoArr: data.value.items,
      videoNextToken: data.value.nextPageToken,
      videoPrevToken: data.value.prevPageToken
    })
  })

}


addToFavoriteVideos(i) {
  addToFavoriteVideos(this.props.userInfo.user_id, this.props.videos.items[i].id.videoId, this.props.videos.items[i].snippet.title, this.props.videos.items[i].snippet.channelTitle);

}

render() {

  let recipeArr = null

  recipeArr = this.state.searchResultsOne

  if (this.state.displayPrev) {
    recipeArr = this.state.searchResultsTwo
  }

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


  const results = recipeArr.map((data, i) => (

       <div className="results-list" key={i}>
       <Link id="results-link" to={`/recipe/${data.recipe_id}`}>
         <img id="results-images" src={data.image_url} alt="N/A" />
          <h3 id="results-titles">{filter(data.title)}</h3>
          <h3 id="results-rating">Rating: {Math.round(data.social_rank)}</h3>
        </Link>
       </div>
     )
   )

     const videoResults = this.state.videoArr.map((video, i) => (
       <div className="video-list" key={i}>
         <ul>
           <li id="video-list-item">
            <iframe title="video-search-results" className="iframe" allowFullScreen src={`https://www.youtube.com/embed/${video.id.videoId}`}></iframe>
            <h1>{video.snippet.title}</h1>
            <h2>By</h2>
            <h2>{video.snippet.channelTitle}</h2>
            <h3 className="video-description">{video.snippet.description}</h3>
            <button id="add-vid-to-favs" onClick={() => {this.addToFavoriteVideos(i)}}>Favorite</button>
           </li>
         </ul>
       </div>
     ))

     if (this.props.loading) {
       return (<Loading />)
     }

     else {

  return (
      <section className="search-results">
        <h1 id="results-main-title">Search Results for "{this.props.match.params.term}"</h1>
        <div className="results-contain">
          {results}
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
          {this.state.youtubePrevious ? <button className="previous-button" onClick={this.youtubePrevious}>Previous</button> : null}
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
    videos: state.youtubeReducer.videos,
    videoLoading: state.youtubeReducer.loading,
    userInfo: state.userReducer.userData
  }
}

export default connect(mapStateToProps, {getRecipes, videoSearch, addToFavoriteVideos, getUserInfo})(SearchResults);
