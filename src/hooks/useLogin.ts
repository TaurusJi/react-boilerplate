import useSWR from "swr";
import { message } from "antd";
import { useImmer } from "use-immer";
import fetcher from "src/utils/request/fetcher";
import { useDispatch, batch } from "react-redux";
import { loginAction, authoritiesAction } from "src/store/app/actions";
import { Store } from "antd/lib/form/interface";

interface LoginModel {
  authorities: string[];
}

const useLogin = () => {
  const dispatch = useDispatch();
  const [state, produce] = useImmer({
    shouldLogin: false,
    loading: false,
    username: "",
    password: "",
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
  const getLoginData = () => {
    return {
      username: state.username,
      password: state.password,
    };
  };
  const resetState = () => {
    produce((draft) => {
      draft.shouldLogin = false;
      draft.loading = false;
    });
  };
  const handleLogin = (data: Store) => {
    produce((draft) => {
      draft.username = data.username;
      draft.password = data.password;
    });
    setShouldLogin(true);
  };

  const url = state.shouldLogin ? "/api/login" : null;
  const makeFetcher = fetcher({
    method: "POST",
    payload: getLoginData(),
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
      batch(() => {
        dispatch(loginAction(true));
        dispatch(authoritiesAction(authorities));
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
