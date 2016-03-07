import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'
import AddToCart from './shared/AddToCart'
import ProductImage from './shared/ProductImage'

class Taxon extends React.Component {
  render() {
    const { taxon, viewer } = this.props;

    return (
      <div>
        <h1>{taxon.name}</h1>
        {taxon.products.edges.map(edge =>
          <div key={edge.node.id} className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <ProductImage product={edge.node} />
              <div className="caption">
                <Link to={`/products/${edge.node.slug}`}>
                  <h3>{edge.node.name}</h3>
                </Link>
                <AddToCart viewer={viewer} product={edge.node} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Relay.createContainer(Taxon, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${AddToCart.getFragment('viewer')}
      }
    `,
    taxon: () => Relay.QL`
      fragment on Taxon {
        id
        name
        products(first: 10) {
          edges {
            node {
              ${ProductImage.getFragment('product')}
              ${AddToCart.getFragment('product')}
              id
              name
              slug
            }
          }
        }
      }
    `,
  }
});
