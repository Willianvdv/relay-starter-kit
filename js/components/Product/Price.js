// @flow

import React from 'react';
import Relay from 'react-relay';

type Props = { product: Object }

class Price extends React.Component<void, Props, void> {
  render() {
    const { product } = this.props;

    return(
     <div>
        {product.price.currency} {product.price.amount}
     </div>
    );
  }
}

export default Relay.createContainer(Price, {
  fragments: {
    product: () => Relay.QL`
      fragment on Product {
        price {
          amount
          currency
        }
      }
    `,
  }
});
