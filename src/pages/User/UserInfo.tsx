import React from "react";

interface InjectChildrenProps {
  name: string;
  age: number;
}

interface IProps {
  count: number;
  children(props: InjectChildrenProps): JSX.Element;
}

const UserInfo: React.FC<IProps> = props => {
  return (
    <div>
      <p>{props.count}</p>
      {props.children({
        name: "Jicy",
        age: 23
      })}
    </div>
  );
};

export default UserInfo;
