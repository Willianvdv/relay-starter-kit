// @flow

import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'

type Props<Config> = {
  taxonomy: Object,
}

type State<Config> = {}

class Taxonomy extends React.Component<void, Props, State> {
  constructor() {
    super()
    this._handleOnClick = this._handleOnClick.bind(this);
  }

  _handleOnClick() {
    this.props.relay.setVariables({ expanded: true });
  }

  _renderTaxonomy(taxonomy) {
    if (!taxonomy.root.children)
      return null;

    return (
      taxonomy.root.children.map(taxon =>
        <li key={taxon.id}>
          <Link to={'/t/' + taxon.permalink}>
            {taxon.name}
          </Link>
        </li>
      )
    )
  }

  render() {
    const { taxonomy } = this.props;

    return (
      <li className="dropdown" key={taxonomy.id}>
        <Link to={'/t/' + taxonomy.root.permalink}>
          {taxonomy.name}
        </Link>

        <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
          {this._renderTaxonomy(taxonomy)}
        </ul>
      </li>
    );
  }
}

        // <a href="#"
        //   className="dropdown-toggle"
        //   onClick={this._handleOnClick}
        //   data-toggle="dropdown"
        //   role="button">
        //     {taxonomy.name}<span className="caret"></span>
        // </a>

export default Relay.createContainer(Taxonomy, {
  initialVariables: {
    expanded: false
  },

  fragments: {
    taxonomy: () => Relay.QL`
      fragment on Taxonomy {
        id
        name
        root {
          id
          name
          permalink
          ... @include(if: $expanded) {
              children {
                id
                name
                permalink
              }
            }
          }
      }
    `,
  }
});

