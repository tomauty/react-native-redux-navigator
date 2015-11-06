import {ROUTER_PUSH, ROUTER_POP} from './actions'
var initialState = {
  routeStack: [{path: '/'}]
};

export default function route(state=initialState, action={}) {
  switch (action.type) {
    case ROUTER_PUSH:
      let {path, passProps} = action
      return {...state, routeStack: [...state.routeStack, {path, passProps}]}
    case ROUTER_POP:
      return {...state, routeStack: [...state.routeStack.slice(0, state.routeStack.length-1)]}
  default:
    return state;
}
}