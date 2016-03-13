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
    if (!taxonomy.root)
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
        <a href="#"
          className="dropdown-toggle"
          onClick={this._handleOnClick}
          data-toggle="dropdown"
          role="button">
            {taxonomy.name}<span className="caret"></span>
        </a>
        <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
          {this._renderTaxonomy(taxonomy)}
        </ul>
      </li>
    );
  }
}

export default Relay.createContainer(Taxonomy, {
  initialVariables: {
    expanded: false
  },

  fragments: {
    taxonomy: () => Relay.QL`
      fragment on Taxonomy {
        id
        name
        ... @include(if: $expanded) {
          root {
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

