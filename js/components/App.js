import React from 'react';
import Relay from 'react-relay';
import Taxon from './Taxon'
import Nav from './Nav'
import Footer from './Footer'
import Cart from './Cart'

class App extends React.Component {
  render() {
    const { children, viewer } = this.props;

    return (
      <div>
        <Nav viewer={viewer} />
        <Cart viewer={viewer} />

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
        ${Cart.getFragment('viewer')}
      }
    `,
  },
});
