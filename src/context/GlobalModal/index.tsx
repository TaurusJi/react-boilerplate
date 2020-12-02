import React, { useContext } from "react";
import { GlobalModalContext } from "./Provider";
import { Modal } from "antd";

const GlobalModal: React.FC = () => {
  const { props, visible } = useContext(GlobalModalContext);

  return <Modal visible={visible} {...props} />;
};

export default GlobalModal;
