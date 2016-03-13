import React from 'react';
import Relay from 'react-relay';
import AddToCart from './shared/AddToCart'
import ProductImage from './shared/ProductImage'
import ProductPrice from './Product/Price'

class Product extends React.Component {
  render() {
    const { product, viewer } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-md-8">
            <h1>{product.name}</h1>
          </div>

          <div className="col-md-4">
            <h3>Buy me now</h3>
            <ProductPrice product={product} />
            <AddToCart viewer={viewer} product={product} />
          </div>
        </div>

        <div>
          <ProductImage product={product} />
        </div>

        <div dangerouslySetInnerHTML={{ __html: product.description}} />

        <div>
          <h3>Product properties</h3>
          <table>
            <tbody>
              {product.product_properties.map(product_property =>
                <tr key={product_property.id}>
                  <td>{product_property.property.name}</td>
                  <td>{product_property.value}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Product, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${AddToCart.getFragment('viewer')}
      }
    `,
    product: () => Relay.QL`
      fragment on Product {
        id
        name
        description
        product_properties {
          id
          value
          property { id name }
        }
        ${ProductImage.getFragment('product')}
        ${ProductPrice.getFragment('product')}
        ${AddToCart.getFragment('product')}
      }
    `,
  },
});
