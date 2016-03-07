import React from 'react';
import Relay from 'react-relay';
import Taxon from './Taxon'
import { Link } from 'react-router'

class Footer extends React.Component {
  render() {
    const { viewer } = this.props;

    return null

    return (
      <footer className="footer">
        <div className="container">
          <ul className="well text-muted">
            {viewer.taxons.edges.map(edge =>
              <li key={edge.node.id}>
                <Link to={`/t/${edge.node.permalink}`}>
                  {edge.node.name}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </footer>
    );
  }
}

export default Relay.createContainer(Footer, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        taxons(first: 10) {
          edges {
            node {
              id permalink name
            }
          }
        }
      }
    `,
  },
});
