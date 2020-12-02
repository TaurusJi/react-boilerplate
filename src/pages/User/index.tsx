import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { UserCss } from "./style";
import { Button, Table } from "antd";
import { useList } from "react-use";
import { GlobalModalActionContext } from "src/context/GlobalModal/Provider";

const EditUserLabel: React.FC<{ id: string }> = ({ id }) => {
  const { openGlobalModal, closeGlobalModal } = useContext(
    GlobalModalActionContext
  );

  const edit = useCallback(
    () =>
      openGlobalModal({
        title: "编辑用户",
        children: <p>{id}</p>,
        onCancel: closeGlobalModal,
        onOk: closeGlobalModal,
      }),
    [id, openGlobalModal, closeGlobalModal]
  );

  return <span onClick={edit}>编辑</span>;
};

const User: React.FC = () => {
  const [index, setIndex] = useState(1);
  const ref = useRef<number | null>(null);
  const [list, { removeAt }] = useList([
    { age: "1" },
    { age: "2" },
    { age: "3" },
    { age: "4" },
  ]);

  const columns = [
    {
      title: "id",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "标题",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "id",
      render: (id: string) => <EditUserLabel id={id} />,
    },
  ];

  const dataSource = [
    {
      id: "1",
      title: "123",
    },
    {
      id: "2",
      title: "123",
    },
  ];

  function onClick() {
    const index = list.findIndex((item) => item.age === "4");
    if (index > -1) {
      removeAt(index);
    }
  }

  useEffect(() => {
    ref.current = index;
  });

  return (
    <UserCss>
      <Table rowKey="id" dataSource={dataSource} columns={columns} />
      <p className="currentIndex">当前的index是: {index}</p>
      <p className="prevIndex">上一个index是: {ref.current}</p>
      <Button
        style={{ marginLeft: 0 }}
        onClick={() => setIndex((prev) => prev + 1)}
      >
        点击让index加1
      </Button>
      {list.map((item, index) => (
        <div key={index}>{item.age}</div>
      ))}
      <Button onClick={onClick}>点击测试</Button>
    </UserCss>
  );
};

export default User;
