import { useState, useEffect, useRef } from "react";
import { useDebounce } from "./hooks/useDebounce";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(0);
  const [parsedUrl, setParsedUrl] = useState("");
  const URLInput = useRef();

  useDebounce(() => setResult(count), 500, [count]);

  // https://www.google.com/search?query=asd&name=josh
  function handlerParseUrl(e) {
    const url = URLInput.current.value;
    let baseUrl = url;
    let domain;
    let queryParams = {};
    console.log(url);

    // BASE URL
    if (url.includes("?")) {
      baseUrl = url.split("?")[0];
    }

    // DOMAIN
    domain = url.split("://")[1].split("/")[0];

    // QUERY PARAMS
    if (url.includes("?")) {
      let params = url.split("?")[1];
      const hasMultipleParams = params.includes("&");

      if (hasMultipleParams) {
        params = params.split("&");

        // BUILD PARAMS OBJECT
        params = params.reduce((paramsObject, param) => {
          const equalSignIndex = param.indexOf("=");
          const key = param.split("=")[0];
          const value = param.substring(equalSignIndex + 1);

          paramsObject[key] = value;
          return paramsObject;
        }, {});
      }
      // HAS JUST ONE QUERY PARAM
      else {
        const key = params.split("=")[0];
        const value = params.split("=")[1];
        params = { [key]: value };
      }

      queryParams = params;
    }

    const newUrl = {
      url,
      baseUrl,
      domain,
      queryParams,
    };

    setParsedUrl(newUrl);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div
        className="card"
        style={{ display: "flex", flexDirection: "column", gap: "5px" }}
      >
        <input
          onChange={(e) => setCount(e.target.value)}
          type="number"
          style={{ padding: "4px 10px" }}
        />
        <button>count is {result}</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label htmlFor="">URL</label>
        <input ref={URLInput} type="text" style={{ padding: "4px 10px" }} />
        <button onClick={handlerParseUrl}>Parse</button>
      </div>
      <p>{JSON.stringify(parsedUrl)}</p>
    </>
  );
}

export default App;
