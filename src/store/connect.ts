import { State } from "./reducers";
import { MapDispatchToPropsParam, connect as ConnectRedux } from "react-redux";

export function connect<TDispatchProps = {}, TOwnProps = any>(
  mapStateToProps?: (state: State, ownProps?: TOwnProps) => any,
  mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
): any {
  return ConnectRedux(mapStateToProps, mapDispatchToProps);
}
