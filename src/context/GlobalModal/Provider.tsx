import { ModalProps } from "antd/lib/modal";
import {
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
  openGlobalModal: (props: ModalConfigType) => void;
  closeGlobalModal: any;
}

const DEFAULT_VALUE: DefaultValue = {
  props: null,
  visible: false,
  openGlobalModal: () => undefined,
  closeGlobalModal: () => undefined,
};

export const GlobalModalContext = createContext(DEFAULT_VALUE);

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

  const contextValue = useMemo(
    () => ({
      props,
      visible,
      closeGlobalModal,
      openGlobalModal,
    }),
    [props, openGlobalModal, closeGlobalModal, visible]
  );

  return (
    <GlobalModalContext.Provider value={contextValue}>
      {children}
    </GlobalModalContext.Provider>
  );
};
