import React from 'react';
import Relay from 'react-relay';

class Taxon extends React.Component {
  render() {
    const { taxon } = this.props;

    return (
      <div>
        <h1>{taxon.name}</h1>
        <ul>
          {taxon.products.edges.map(edge =>
            <li key={edge.node.id}>{edge.node.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(Taxon, {
  fragments: {
    taxon: () => Relay.QL`
      fragment on Taxon {
        id
        name
        products(first: 10) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
  }
});
