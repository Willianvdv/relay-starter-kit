import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'
import ProductImage from '../shared/ProductImage'

class LineItem extends React.Component {
  render() {
    const { line_item } = this.props;

    return (
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
    );
  }

}

export default Relay.createContainer(LineItem, {
  fragments: {
    line_item: () => Relay.QL`
      fragment on LineItem {
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
    `,
  }
});
