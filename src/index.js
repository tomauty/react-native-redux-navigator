import React, { Navigator } from 'react-native';

import RouterRegistry from './RouterRegistry';
import Router from './Router';
import * as actions from './actions'

const BACK = 'BACK';
const FORWARD = 'FORWARD';

export {
  Router,
  RouterRegistry,
  actions
}