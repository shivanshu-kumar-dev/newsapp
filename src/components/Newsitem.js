import React, { Component } from "react";
import moment from "moment";

export class NewsItem extends Component {
  render() {
    let { title, desc, ImgUrl, url, author, publishedAt, source } = this.props;
    var dateString = moment(publishedAt).format("DD/MM/YYYY kk:mm:ss");
    return (
      <div>
        <div className="card my-4">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <span className="position-absolute badge rounded-pill bg-danger">
              {source}
              <span className="visually-hidden">unread messages</span>
            </span>


          </div>
          <img src={ImgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>

            <footer className="blockquote-footer my-2">
              By {author == null ? "Unknown" : author} at{" "}
              <cite title="Source Date"> {dateString} </cite>
            </footer>
            <a href={url} target="_blank" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
