import React, { Component } from "react";
import NewsItem from "./NewsItem";
import LoadingSpinner from "./LoadingSpinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      Totalpages: 1,
      totalResults: 0,
    };
  }

  async UpdatePage() {
    this.props.setProgress(20);

    this.state.loading = true;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cataegory}&apiKey=d652d134332f4f2894890d0ee9e8dd0d&page=${this.state.page+1}&pagesize=${this.props.ResultsOnEachPage}`;
    this.setState({ page: this.state.page + 1 });
    this.props.setProgress(30);
    let data = await fetch(url);
    this.props.setProgress(50);
    let abc = await data.json();
    this.props.setProgress(90);
    this.setState({
      progress: 100,
      articles: this.state.articles.concat(abc.articles),
      Totalpages: Math.ceil(abc.totalResults / this.props.ResultsOnEachPage),
      loading: false,
      totalResults: abc.totalResults,
    });

    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.UpdatePage();
  }

  btnPrev = async () => {
   // this.setState({ page: this.state.page - 1 });
    this.UpdatePage();
  };

  btnNext = async () => {
   // this.setState({ page: this.state.page + 1 });
    this.UpdatePage();
  };

  render() {
    return (
      <div>
        <div>
        <h2 className="d-flex justify-content-center my-3">NewsMonkey- Top Headlines</h2>
        </div>
        {this.state.loading == true && <LoadingSpinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          hasMore={this.state.page < this.state.Totalpages}
          next={this.btnNext}
          loader={<h1>loading...</h1>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element, index) => {
                return (
                  <div className="col-md-4" key={index}>
                    <NewsItem
                      title={element.title}
                      desc={element.description}
                      ImgUrl={element.urlToImage}
                      url={element.url}
                      author={element.author}
                      publishedAt={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* 
        <div className="d-flex justify-content-around">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-primary"
            onClick={this.btnPrev}
          >
            Previous
          </button>
          <button
            disabled={this.state.page >= this.state.Totalpages}
            type="button"
            className="btn btn-primary"
            onClick={this.btnNext}
          >
            Next
          </button>
        </div>
          <div className="my-3"> </div>   */}
      </div>
    );
  }
}

News.propTypes = {
  ResultsOnEachPage: PropTypes.number,
  cataegory: PropTypes.string,
  country: PropTypes.string,
};

News.defaultProps = {
  cataegory: "general",
  country: "in",
  ResultsOnEachPage: 5,
};

export default News;