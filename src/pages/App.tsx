import React from "react";
import styles from "./App.module.scss";
// import _ from "lodash";

// const a = {
//   b: {
//     c: "1"
//   }
// };
// console.log(_.get(a, "b.c", ""), "");
// console.log(...a);

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <header className={styles.AppHeader}>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={styles.AppLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
