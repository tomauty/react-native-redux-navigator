import React, { Navigator } from 'react-native'
import RouterRegistry from './RouterRegistry'
import _ from 'lodash'
import * as actions from './actions'

const BACK = 'BACK';
const FORWARD = 'FORWARD';

class Router extends React.Component {

  static propTypes = {
    registry: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    // Set initial route to match navigator.currentRoutes() with initialRoute
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
    // Synchronize Redux==>Navigator
    let routerRoutes = this.refs.navigator.getCurrentRoutes()
    let routeStack = nextProps.routeStack
    let i = 0
    let routerRoute, routeStackRoute
    // Find first route that doesn't match
    for(;i<routerRoutes.length; i++) {
      routerRoute = routerRoutes[i]
      routeStackRoute = routeStack[i]
      if(!routeStackRoute || routerRoute.path!=routeStackRoute.path || routerRoute.passProps!=routeStackRoute.passProps) {
        console.log('mismatch')
        break
      }
    }

    // If router has some extraneous routes that are not redux
    if(i<routerRoutes.length) {
      // If only off by 1 - pop() as in 'Back'
      if(routerRoutes.length-routeStack.length==1) {
        console.log('pop')
        this.refs.navigator.pop()
        console.log('getCurrentRoutes', this.refs.navigator.getCurrentRoutes())
      } else if (routeStack.length==routerRoutes.length) {
        console.log('replace', routeStackRoute.path)
        this.replace(routeStackRoute)
        i++;
      } else {
        console.log('jumpTo', i)
        this.refs.navigator.jumpTo(routerRoute);
      }
    }

    // Push all missing routes
    for(;i<routeStack.length; i++) {
      routeStackRoute = routeStack[i]
      console.log('push', i, routeStackRoute.path)
      this.push(routeStackRoute);
    }
  }

  render() {
    return <Navigator
      ref="navigator"
      initialRoute={this.props.registry.getInitialRoute()}
      {...this.props}
      configureScene={(route) => (route.direction === BACK) ? Navigator.SceneConfigs.FloatFromRight : Navigator.SceneConfigs.FloatFromLeft}/>
  }

  push({path, passProps}) {
    let route = this.props.registry.getRouteByPath(path);
    route.direction = FORWARD;
    route.passProps = passProps
    this.refs.navigator.push(route);
  }

  replace({path, passProps}) {
    let route = this.props.registry.getRouteByPath(path);
    route.direction = FORWARD;
    route.passProps = passProps
    this.refs.navigator.replace(route);
  }
}

export default Router