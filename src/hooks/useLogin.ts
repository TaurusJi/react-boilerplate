import useSWR from "swr";
import { message } from "antd";
import { useImmer } from "use-immer";
import { useAppContext } from "src/store/app";
import fetcher from "src/utils/request/fetcher";

interface LoginModel {
  authorities: string[];
}

interface LoginPayload {
  username: string;
  password: string;
}

const useLogin = (data: LoginPayload) => {
  const { setContext } = useAppContext();
  const [state, produce] = useImmer({
    shouldLogin: false,
    loading: false,
  });
  const setShouldLogin = (data: boolean) => {
    produce((draft) => {
      draft.shouldLogin = data;
    });
  };
  const setLoading = (data: boolean) => {
    produce((draft) => {
      draft.loading = data;
    });
  };
  const resetState = () => {
    produce((draft) => {
      draft.shouldLogin = false;
      draft.loading = false;
    });
  };
  const handleLogin = () => {
    setShouldLogin(true);
  };

  const url = state.shouldLogin ? "/api/login" : null;
  const makeFetcher = fetcher({
    method: "POST",
    payload: data,
  });

  useSWR<LoginModel>(url, makeFetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    loadingTimeout: 1000,
    onLoadingSlow: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      const authorities = data?.authorities ?? [];
      setContext((draft) => {
        draft.isLogin = true;
        if (authorities) {
          draft.authorities.push(...authorities);
        }
      });
      resetState();
    },
    onError: (err: Error) => {
      message.error("登陆请求失败，请稍后再试");
      resetState();
    },
  });

  return {
    handleLogin,
    loading: state.loading,
  };
};

export default useLogin;
