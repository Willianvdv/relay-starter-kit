import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'
import AddToCart from './../mutations/AddToCart'
import ProductImage from './shared/ProductImage'

class Cart extends React.Component {
  _renderLineItems(line_items) {
    if (line_items.length == 0) {
      return (<i>No items in cart</i>);
    }

    return line_items.map(line_item =>
       <div key={line_item.id} className="row">
         <div className="col-md-1">
           <div className="thumbnail">
             <ProductImage product={line_item.variant.product} />
           </div>
         </div>

         <div className="col-md-7">
           {line_item.quantity} - 
           <Link to={`/products/${line_item.variant.product.slug}`}>
             {line_item.variant.product.name}
           </Link>
         </div>
       </div>
     )
  }

  render() {
    const { cart } = this.props.viewer;

    return (
      <div className="well">
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
          line_items {
            id
            quantity
            variant {
              product {
                ${ProductImage.getFragment('product')}
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

