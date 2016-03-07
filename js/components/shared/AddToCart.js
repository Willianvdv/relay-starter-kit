import React from 'react';
import Relay from 'react-relay';
import AddToCartMutation from './../../mutations/AddToCart'

class AddToCart extends React.Component {
  _handleAddToCart() {
    Relay.Store.commitUpdate(
      new AddToCartMutation({
        viewer: this.props.viewer,
        variant: this.props.product.master,
      })
    );
  }

  render() {
    const { product } = this.props;

    return (
      <button type="button" className="btn btn-default btn-lg" onClick={() => this._handleAddToCart()}>
        Add to cart
      </button>
    );
  }
}

export default Relay.createContainer(AddToCart, {
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer { id }`,
    product: () => Relay.QL`fragment on Product { master { id } }`,
  },
})
