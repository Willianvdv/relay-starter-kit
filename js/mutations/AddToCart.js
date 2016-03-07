import Relay from 'react-relay';
import Cart from './../components/Cart'

export default class AddToCart extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{AddToCart}`
  }

  getVariables() {
    return { id: this.props.variant.id };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddToCartPayload {
        viewer {
          ${Cart.getFragment('viewer')}
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          viewer: this.props.viewer.id
        }
      },
    ];
  }
}
