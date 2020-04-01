import React from "react";
import { isNil } from "lodash";

type beforeRender<T = typeof React.Component> = (
  guard?: Function
) => (Component: T) => T;

export interface IState {
  isWaiting: boolean;
}

/**
 * 渲染前
 * @param {Function} guard
 * @returns 包装后的Component
 */
const beforeRender: beforeRender = (guard) => (Component) => {
  return class RouteGuard extends Component<{}, IState> {
    state = {
      isWaiting: true,
    };

    componentDidMount() {
      if (isNil(guard)) {
        this.setState({
          isWaiting: false,
        });
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

export default beforeRender;
