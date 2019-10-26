import React from "react";
import { hot } from "react-hot-loader/root";
import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <div className={styles.App}>
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

export default hot(App);
