import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'
import AddToCart from './../mutations/AddToCart'

class Cart extends React.Component {
  render() {
    const { cart } = this.props.viewer;

    return (
      <div className="well">
        <h2>My cart</h2>
        <table>
          <thead>
            <tr>
              <th>Qty</th>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
            {cart.line_items.map(line_item =>
              <tr key={line_item.id}>
                <td>{line_item.quantity}</td>
                <td>
                  <Link to={`/products/${line_item.variant.product.slug}`}>
                    {line_item.variant.product.name}
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
          line_items {
            id
            quantity
            variant {
              product {
                id
                name
                slug
              }
            }
          }
        }
      }
    `,
  }
});

