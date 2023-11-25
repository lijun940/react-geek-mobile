import "@scss/index.scss";
import ReactDOM from "react-dom";
import App from "./App.js";
import { Suspense, useEffect, useRef, useState } from "react";
import store from "./store/index.js";
import { Provider } from "react-redux";
function App2() {
  const [count, setCount] = useState(0);
  const aRef = useRef(0);
  useEffect(() => {
    console.log("我会更新么");
  }, [aRef]);
  const showCount = () => {
    setTimeout(() => {
      console.log("count值", count);
      console.log(aRef.current, "ref");
    }, 4000);
  };
  const add = () => {
    setTimeout(() => {
      setCount((count) => count + 1);
      aRef.current = count + 1;
    }, 2000);
  };

  return (
    <div>
      <h1>根组件</h1>
      <div>我被点击了{count}次</div>
      <button onClick={add}>点击</button>
      <button onClick={showCount}>获取count的值</button>
    </div>
  );
}
ReactDOM.render(
  <Suspense fallback>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
  document.querySelector("#root")
);
