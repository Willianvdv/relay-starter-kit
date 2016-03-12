import React from 'react';
import Relay from 'react-relay';
import AddToCart from './shared/AddToCart'
import ProductImage from './shared/ProductImage'

class Product extends React.Component {
  render() {
    const { product, viewer } = this.props;

    return (
      <div>
        <h1>{product.name}</h1>
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
        <div>
          <h3>Buy me now!</h3>
          <AddToCart viewer={viewer} product={product} />
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
        ${AddToCart.getFragment('product')}
      }
    `,
  },
});
