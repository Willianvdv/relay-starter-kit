// @flow

import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'

type Props<Config> = {
  taxonomy: {
    __dataID__: string,
    id: string,
    name: string,
    taxons: [{
      __dataID__: string,
      id: string,
      name: string,
      permalink: string,
    }]
  }
}

type State<Config> = {}

class Taxonomy extends React.Component<void, Props, State> {
  render() {
    const { taxonomy } = this.props;

    return (
      <li className="dropdown" key={taxonomy.id}>
        <a href="#"
          className="dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false">
            {taxonomy.name}<span className="caret"></span>
        </a>
        <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
          {taxonomy.taxons.map(taxon =>
            <li key={taxon.id}>
              <Link to={'/t/' + taxon.permalink}>
                {taxon.name}
              </Link>
            </li>
          )}
        </ul>
      </li>
    );
  }
}

export default Relay.createContainer(Taxonomy, {
  fragments: {
    taxonomy: () => Relay.QL`
      fragment on Taxonomy {
        id
        name
        taxons { id name permalink }
      }
    `,
  }
});

