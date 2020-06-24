import constate from "constate";
import { useImmer } from "use-immer";

interface AppModel {
  isLogin: boolean;
  authorities: string[];
}

const [appProvider, appContext] = constate(() => {
  const [context, setContext] = useImmer<AppModel>({
    isLogin: true,
    authorities: ["admin"],
  });

  return {
    context,
    setContext,
  };
});

export const AppProvider = appProvider;
export const useAppContext = appContext;
