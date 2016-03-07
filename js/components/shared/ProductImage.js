import React from 'react';
import Relay from 'react-relay';

class ProductImage extends React.Component {
  render() {
    const { product } = this.props;

    return(
      <img src={"http://lorempixel.com/400/200/cats/?" + product.id} />
    );
  }
}

export default Relay.createContainer(ProductImage, {
  fragments: {
    product: () => Relay.QL`fragment on Product { id }`
  }
});
