import constate from "constate";
import { useImmer } from "use-immer";

const [appProvider, appContext] = constate(() => {
  const [context, setState] = useImmer({
    isLogin: true,
  });

  return {
    context,
    setState,
  };
});

export const AppProvider = appProvider;
export const useAppContext = appContext;
