// @flow

import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'
import Taxonomy from './Nav/Taxonomy'

type Props = { viewer: Object }
type State = {}

class Nav extends React.Component<void, Props, State> {
  render() {
    const { viewer } = this.props;

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Solidus on Relay</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li>
                <Link to={`/cart`}>
                 Cart <span className="badge">{viewer.cart.quantity}</span>
                </Link>
              </li>
              {viewer.taxonomies.map(taxonomy =>
                <Taxonomy taxonomy={taxonomy} key={taxonomy.id} />
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Relay.createContainer(Nav, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        taxonomies {
          id
          ${Taxonomy.getFragment('taxonomy')}
        }
        cart {
          quantity
        }
      }
    `,
  },
});
