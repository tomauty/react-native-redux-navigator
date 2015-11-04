export const ROUTER_PUSH = 'ROUTER_PUSH'
export const ROUTER_POP = 'ROUTER_POP'

export function push(path, passProps) {
  return {
    type: ROUTER_PUSH,
    path,
    passProps
  };
}

export function pop() {
  return {
    type: ROUTER_POP,
  };
}
