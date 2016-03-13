// @flow

import React from 'react';
import Relay from 'react-relay';
import Taxon from './Taxon'
import Nav from './Nav'
import Footer from './Footer'

type Props = { children: ?Object, viewer: Object }
type State = {}

class App extends React.Component<void, Props, State> {
  render() {
    const { children, viewer } = this.props;

    return (
      <div>
        <Nav viewer={viewer} />

        <div className="container">
          {children}
        </div>

        <Footer viewer={viewer} />
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${Nav.getFragment('viewer')}
        ${Footer.getFragment('viewer')}
      }
    `,
  },
});
