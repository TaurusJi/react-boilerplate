import { FC, useEffect } from "react";
import { Button } from "antd";
import { useImmer } from "use-immer";

const LYE: FC = () => {
  // const [lapse, setLapse] = React.useState(0);
  // const [running, setRunning] = React.useState(false);

  const [state, produce] = useImmer({
    lapse: 0,
    running: false,
  });

  useEffect(() => {
    const { running, lapse } = state;
    if (running) {
      const startTime = Date.now() - lapse;
      const intervalId = setInterval(() => {
        produce((draft) => {
          if (draft.running) {
            draft.lapse = Date.now() - startTime;
          }
        });
      }, 2);
      return () => clearInterval(intervalId);
    }
  }, [produce, state]);

  function handleRunClick() {
    produce((draft) => {
      draft.running = !draft.running;
    });
  }

  function handleClearClick() {
    produce((draft) => {
      draft.running = false;
      draft.lapse = 0;
    });
  }

  return (
    <div>
      <label>{state.lapse}ms</label>
      <Button style={{ marginLeft: 0 }} onClick={handleRunClick}>
        {state.running ? "暂停" : "开始"}
      </Button>
      <Button style={{ marginLeft: 0 }} onClick={handleClearClick}>
        暂停并清0
      </Button>
    </div>
  );
};

export default LYE;
