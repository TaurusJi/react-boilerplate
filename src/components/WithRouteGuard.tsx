import React from "react";
import { isNil } from "lodash";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

type ComponentType = typeof React.Component;

type WithRouteGuard = (guard?: () => any) => (Component: ComponentType) => any;

export interface IState {
  isWaiting: boolean;
}

/**
 * 路由守卫
 * @param {Function} guard
 * @returns 包装后的Component
 */
const withRouteGuard: WithRouteGuard = guard => Component => {
  return class RouteGuard extends Component<{}, IState> {
    state = {
      isWaiting: true
    };

    UNSAFE_componentWillMount() {
      nProgress.start();
    }

    componentDidMount() {
      if (isNil(guard)) {
        this.setState(
          {
            isWaiting: false
          },
          () => {
            nProgress.done();
          }
        );
      }

      if (typeof guard === "function") {
        guard.apply(this);
      }
    }

    render() {
      const { isWaiting } = this.state;
      return <>{!isWaiting && super.render()}</>;
    }
  };
};

export default withRouteGuard;
