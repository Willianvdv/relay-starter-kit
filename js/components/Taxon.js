import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'
import AddToCart from './shared/AddToCart'

class Taxon extends React.Component {
  render() {
    const { taxon, viewer } = this.props;

    return (
      <div>
        <h1>{taxon.name}</h1>
        {taxon.products.edges.map(edge =>
          <div className="well" key={edge.node.id}>
            <AddToCart viewer={viewer} product={edge.node} />

            <Link to={`/products/${edge.node.slug}`}>
              {edge.node.name}
            </Link>
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
