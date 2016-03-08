import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import App from './components/App';
import Product from './components/Product';
import Taxon from './components/Taxon';
import Cart from './components/Cart';

import AppHomeRoute from './routes/AppHomeRoute';

import { Router, Route, Link, browserHistory } from 'react-router'
import { RelayRouter, useRouterHistory } from 'react-router-relay';

const ViewerQueries = {
  viewer: () => Relay.QL`query { viewer }`
};

const ProductQueries = {
  viewer: () => Relay.QL`query { viewer }`,
  product: () => Relay.QL`query { product(productId: $productId) }`
};

const TaxonQueries = {
  viewer: () => Relay.QL`query { viewer }`,
  taxon: () => Relay.QL`query { taxon(taxonId: $taxonId) }`
};

const container = document.getElementById('root');

ReactDOM.render((
  <RelayRouter history={useRouterHistory}>
    <Route path="/" component={App} queries={ViewerQueries}>
      <Route path="cart" component={Cart} queries={ViewerQueries} />
      <Route path="products/:productId" component={Product} queries={ProductQueries} />
      <Route path="t/:taxonId" component={Taxon} queries={TaxonQueries} />
    </Route>
  </RelayRouter>
), container);
