import React from 'react';
import Relay from 'react-relay';
import AddToCart from './shared/AddToCart'

class Product extends React.Component {
  render() {
    const { product, viewer } = this.props;

    return (
      <div>
        <h1>{product.name}</h1>
        <div>
          {product.description}
        </div>
        <AddToCart viewer={viewer} product={product} />
      </div>
    );
  }
}

export default Relay.createContainer(Product, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${AddToCart.getFragment('viewer')}
      }
    `,
    product: () => Relay.QL`
      fragment on Product {
        id
        name
        description
        ${AddToCart.getFragment('product')}
      }
    `,
  },
});
