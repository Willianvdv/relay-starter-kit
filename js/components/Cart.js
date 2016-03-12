// @flow

import React from 'react';
import Relay from 'react-relay';
import LineItem from './Cart/LineItem'

type Props = { viewer: Object }

class Cart extends React.Component<void, Props, void>  {
  _renderLineItems(line_items) {
    if (line_items.length == 0) {
      return (<i>No items in cart</i>);
    }

    return line_items.map(line_item =>
      <LineItem key={line_item.id} line_item={line_item} />
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
            id
            ${LineItem.getFragment('line_item')}
          }
        }
      }
    `,
  }
});

