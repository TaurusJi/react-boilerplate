import { IMenu } from "src/components/Sider";

export const menuData: IMenu[] = [
  {
    name: "仪表盘",
    icon: "dashboard",
    path: "dashboard",
    children: [
      {
        name: "用户",
        path: "user"
      },
      {
        name: "表单",
        path: "form"
      },
      {
        name: "测试",
        path: "test"
      },
      {
        name: "分析页",
        path: "analysis",
        children: [
          {
            name: "实时数据",
            path: "realtime"
          },
          {
            name: "离线数据",
            path: "offline"
          }
        ]
      }
    ]
  }
];
