import { useState } from "react";
import useSWR from "swr";
import { message } from "antd";
import { useAppContext } from "src/store/app";
import fetcher from "src/utils/request/fetcher";

interface LoginModel {
  authorities: string[];
}

const useLogin = (username: string, password: string) => {
  const { setContext } = useAppContext();
  const [shouldLogin, setShouldLogin] = useState(false);
  const makeFetcher = fetcher({
    method: "POST",
    payload: {
      username,
      password,
    },
  });

  const handleLogin = () => {
    setShouldLogin(true);
  };

  const onSuccess = (data: LoginModel) => {
    const authorities = data?.authorities ?? [];
    setContext((draft) => {
      draft.isLogin = true;
      if (authorities) {
        draft.authorities.push(...authorities);
      }
    });
    setShouldLogin(false);
  };

  const onError = (err: Error) => {
    message.error("登陆请求失败，请稍后再试");
    setShouldLogin(false);
  };

  useSWR<LoginModel>(shouldLogin ? "/api/login" : null, makeFetcher, {
    shouldRetryOnError: false,
    onSuccess,
    onError,
  });

  return {
    handleLogin,
  };
};

export default useLogin;
