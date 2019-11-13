import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "src/store/reducers/index";
import { useHistory } from "react-router";
import { NormalLayoutCss } from "./style";
import { Helmet } from "react-helmet";
import { getPageTitle } from "src/utils/getPageTitle";
import { useRoute } from "src/utils/getCurrentRoute";

const NormalLayout: React.FC = props => {
  const { isLogin } = useSelector((state: State) => state.app);
  const { route } = useRoute();
  const history = useHistory();
  const pageTitle = getPageTitle(route);

  // 登录后访问非权限路由 重定向至dashboard/user
  useEffect(() => {
    if (isLogin) {
      history.push("/dashboard/user");
    }
  }, [history, isLogin]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <NormalLayoutCss>{props.children}</NormalLayoutCss>
    </>
  );
};

export default NormalLayout;
