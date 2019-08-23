import React from "react";
import axios from "axios";
import "./style/index";

class JueJin extends React.Component {
  state = {
    data: []
  };

  async componentDidMount() {
    const res = await axios.get("http://localhost:9000/post/juejin");
    this.setState({
      data: res.data
    });
    console.log(res);
  }

  render() {
    return (
      <div id="juejin">
        <ul className="post-list list">
          {this.state.data.map(post => (
            <li key={post.url + post.title} className="list-item">
              <a href={post.url} target="__blank">
                <div className="before-box box">
                  {post.author ? (
                    <span className="box-item">{post.author}</span>
                  ) : (
                    ""
                  )}
                  {post.tag ? <span className="box-item">{post.tag}</span> : ""}
                </div>
                <div className="content-box box">
                  <p className="title box-item">{post.title}</p>
                  <p className="description box-item">{post.description}</p>
                </div>
                <div className="after-box box">
                  <span className="box-item">
                    <i className="iconfont icon-dianzan11" />
                    {post.like}
                  </span>
                  <span className="box-item">
                    <i className="iconfont icon-pinglun" />
                    {post.comment}
                  </span>
                  <span className="box-item box">
                    <i
                      className={`iconfont icon-${
                        post.collected ? "shoucang1" : "star"
                      }`}
                      onClick={this.collectionPost.bind(this, post)}
                    />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  collectionPost = async (post, e) => {
    let data = this.state.data;

    e.stopPropagation();
    e.preventDefault();

    await axios.post("http://localhost:9000/collection/add", {
      id: post._id,
      alias: "test",
      type: "post"
    });

    data = data.map(d => {
      if (d._id === post._id) {
        d.collected = true;
      }

      return d;
    });

    this.setState({
      data
    });
  };
}

export default JueJin;
