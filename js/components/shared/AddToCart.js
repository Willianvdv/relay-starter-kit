import React from 'react';
import Relay from 'react-relay';
import AddToCartMutation from './../../mutations/AddToCart'

class AddToCart extends React.Component {
  state = { quantity: 1 }

  constructor() {
    super()
    this._handleQuantityChange = this._handleQuantityChange.bind(this)
  }

  _handleQuantityChange(event) {
    this.setState({ quantity: event.target.value })
  }

  _handleAddToCart() {
    Relay.Store.commitUpdate(
      new AddToCartMutation({
        viewer: this.props.viewer,
        variant: this.props.product.master,
        quantity: this.state.quantity,
      })
    );
  }

  render() {
    const { product } = this.props;
    const { quantity } = this.state;

    return (
      <div className="form-inline">
        <div className="form-group">
          <input
            type="number"
            name="quantity"
            type="number"
            value={quantity}
            className="form-control" 
            onChange={this._handleQuantityChange} />

          <button type="button" className="btn btn-primary" onClick={() => this._handleAddToCart()}>
            Add to cart
          </button>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(AddToCart, {
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer { id }`,
    product: () => Relay.QL`fragment on Product { master { id } }`,
  },
})
