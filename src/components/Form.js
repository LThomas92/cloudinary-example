import React from "react";
import { connect } from "react-redux";
import { addImage } from "../actions/imageActions";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      image: ""
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeTitle = e => {
    this.setState({ title: e.target.value });
  };

  onChangeImage = e => {
    this.setState({ image: e.target.files[0] });
  };

  onSubmit(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("image", this.state.image);

    this.props.addImage(formData);
    this.setState({
      title: "",
      image: ""
    });
  }

  render() {
    return (
      <div className="form-container">
        <form encType="multipart/form-data" onSubmit={this.onSubmit}>
          <h2>Image Form</h2>
          <label className="form-label">Image Title</label>
          <input
            className="form-input"
            placeholder="Enter Image Title"
            type="text"
            value={this.state.title}
            onChange={this.onChangeTitle}
          />
          <label className="form-label">Choose an Image</label>
          <input
            type="file"
            className="form-input"
            onChange={this.onChangeImage}
          />
          <button type="submit" className="submit-btn">
            Submit!
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addImage }
)(Form);
