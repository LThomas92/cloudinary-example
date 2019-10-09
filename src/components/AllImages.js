import React from "react";
import { connect } from "react-redux";
import { getAllImages } from "../actions/imageActions";

class AllImages extends React.Component {
  componentDidMount() {
    this.props.getAllImages();
  }

  render() {
    return this.props.images.map(image => {
      return (
        <div className="image-card-container">
          <div key={image.id} className="image-card">
            <h4 className="image-title">{image.title}</h4>
            <img
              className="main-image"
              src={image.image}
              alt="This is a terrible description!"
            />
          </div>
        </div>
      );
    });
  }
}

const mapStateToProps = state => {
  return {
    images: Object.values(state.images)
  };
};

export default connect(
  mapStateToProps,
  { getAllImages }
)(AllImages);
