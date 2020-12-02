import { ModalProps } from "antd/lib/modal";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

type ModalConfigType = (ModalProps & { children: ReactNode }) | null;

interface DefaultValue {
  props: ModalProps | null;
  visible: boolean;
}

interface DefaultAction {
  openGlobalModal: (props: ModalConfigType) => void;
  closeGlobalModal: any;
}

const DEFAULT_VALUE: DefaultValue = {
  props: null,
  visible: false,
};

const DEFAULT_ACTION: DefaultAction = {
  openGlobalModal: () => undefined,
  closeGlobalModal: () => undefined,
};

export const GlobalModalPropsContext = createContext(DEFAULT_VALUE);
export const GlobalModalActionContext = createContext(DEFAULT_ACTION);

export const GlobalModalContextProvider: React.FC = ({ children }) => {
  const [props, setProps] = useState<ModalConfigType>(null);
  const [visible, setVisible] = useState(false);

  const closeGlobalModal = useCallback(() => {
    setVisible(false);
  }, []);

  const openGlobalModal = useCallback((config: ModalConfigType) => {
    setProps(config);
    setVisible(true);
  }, []);

  const actionValue = useMemo(() => {
    return {
      closeGlobalModal,
      openGlobalModal,
    };
  }, [closeGlobalModal, openGlobalModal]);

  const propsValue = useMemo(
    () => ({
      props,
      visible,
    }),
    [props, visible]
  );

  return (
    <GlobalModalActionContext.Provider value={actionValue}>
      <GlobalModalPropsContext.Provider value={propsValue}>
        {children}
      </GlobalModalPropsContext.Provider>
    </GlobalModalActionContext.Provider>
  );
};
