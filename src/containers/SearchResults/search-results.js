import React, { Component } from 'react';
import { getRecipes } from '../../ducks/search-recipes';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { videoSearch } from '../../ducks/youtube';
import './search-results.css';
import Loading from '../../components/Loading/loading';


class SearchResults extends Component {


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

     const videoResults = this.props.videos.map((video, i) => (
       <div className="video-list" key={i}>
         <ul>
           <li className="video-list-item">
            <iframe className="iframe" allowFullScreen src={`https://www.youtube.com/embed/${video.id.videoId}`}></iframe>
            <h1>{video.snippet.title}</h1>
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
        <h1 id="results-main-title">Search Results</h1>
        <div className="results-contain">
          {Results}
        </div>
        <h1 id="video-results-title">Videos</h1>
        <div className="videos-contain">
          {videoResults}
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
    videoLoading: state.youtubeReducer.loading
  }
}

export default connect(mapStateToProps, {getRecipes, videoSearch})(SearchResults);
