import React from 'react';
import Relay from 'react-relay';
import Taxon from './Taxon'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Taxon list</h1>
        <ul>
          {this.props.viewer.taxons.edges.map(edge =>
            <Taxon key={edge.node.id} taxon={edge.node} />
          )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        taxons(first: 10) {
          edges {
            node {
              id
              ${Taxon.getFragment('taxon')}
            }
          }
        }
      }
    `,
  },
});
