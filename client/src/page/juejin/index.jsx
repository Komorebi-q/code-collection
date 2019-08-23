import React from "react";
import axios from "axios";

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
      <ul>
        {this.state.data.map(post => (
          <li key={post.url + post.title}>
            <a href={post.url} target="__blank">
              {post.title}
            </a>
            <button onClick={this.collectionPost.bind(this, post)}>收藏</button>
          </li>
        ))}
      </ul>
    );
  }

  collectionPost = post => {
    axios.post("http://localhost:9000/collection/add", {
      id: post._id,
      alias: "test",
      type: "post"
    });
  };
}

export default JueJin;
