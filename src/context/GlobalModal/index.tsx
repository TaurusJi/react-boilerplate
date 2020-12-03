import { FC, useContext } from "react";
import { GlobalModalPropsContext } from "./Provider";
import { Modal } from "antd";

const GlobalModal: FC = () => {
  const { props, visible } = useContext(GlobalModalPropsContext);

  return <Modal visible={visible} {...props} />;
};

export default GlobalModal;
