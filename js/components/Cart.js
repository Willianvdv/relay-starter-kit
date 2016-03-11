import React from 'react';
import Relay from 'react-relay';

import LineItem from './Cart/LineItem'

class Cart extends React.Component {
  _renderLineItems(line_items) {
    if (line_items.length == 0) {
      return (<i>No items in cart</i>);
    }

    return line_items.map(line_item =>
      <LineItem line_item={line_item} />
    )
  }

  render() {
    const { cart } = this.props.viewer;

    return (
      <div>
        <h2>My cart</h2>

        {this._renderLineItems(cart.line_items)}
      </div>
    );
  }
}

export default Relay.createContainer(Cart, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        cart {
          id
          quantity
          line_items {
            ${LineItem.getFragment('line_item')}
          }
        }
      }
    `,
  }
});

