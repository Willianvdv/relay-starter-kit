import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'

class Nav extends React.Component {
  render() {
    const { viewer } = this.props;

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Relay</a>
            <ul className="nav navbar-nav">
              <li>
                <Link to={`/t/aanbiedingen`}>
                 Offers
                </Link>
              </li>
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
      }
    `,
  },
});
