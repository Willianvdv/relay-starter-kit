import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'
import AddToCart from './shared/AddToCart'
import ProductImage from './shared/ProductImage'
import ProductPrice from './Product/Price'

class Taxon extends React.Component {
  constructor() {
    super()
    this._handleLoadMore = this._handleLoadMore.bind(this)
  }

  _handleLoadMore() {
    this.props.relay.setVariables({
      count: this.props.relay.variables.count + 10
    });
  }

  render() {
    const { taxon, viewer } = this.props;

    return (
      <div>
        <h1>{taxon.name}</h1>
        <div dangerouslySetInnerHTML={{ __html: taxon.description}} />
        <div className="row">
          <div className="col-md-2">
            FilterFilter
          </div>
          <div className="col-md-10">
            <div className="row">
              <div className="row">
                {taxon.children.map(taxon =>
                  <div key={taxon.id} className="col-sm-6 col-md-4">
                    <Link to={`/t/${taxon.permalink}`}>
                      <h3>{taxon.name}</h3>
                    </Link>
                  </div>
                )}
              </div>

              {taxon.products.edges.map(edge =>
                <div style={{ 'minHeight': '450px' }} key={edge.node.id} className="col-sm-6 col-md-4">
                  <div className="thumbnail">
                    <ProductImage product={edge.node} />
                    <div className="caption">
                      <Link to={`/products/${edge.node.slug}`}>
                        <h3>{edge.node.name}</h3>
                      </Link>
                      <ProductPrice product={edge.node} />
                      <AddToCart viewer={viewer} product={edge.node} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <center>
            <a onClick={this._handleLoadMore}>Load more</a>
          </center>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Taxon, {
  initialVariables: {
    count: 9
  },

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
        description
        children {
          id
          name
          permalink
        }
        products(first: $count) {
          edges {
            node {
              ${ProductImage.getFragment('product')}
              ${ProductPrice.getFragment('product')}
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
