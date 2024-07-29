import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "./main.module.css";

function MainSection() {
  const [state, setState] = useState({
    length: 8,
    includeNumbers: false,
    includeSpecialChar: false,
    password: "",
  });

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "QAZWSXEDCRFVTGBYHNUJMIKOLPqazwsxedcrfvtgbyhnujmikolp";

    if (state.includeNumbers) str += "0123456789";
    if (state.includeSpecialChar) str += "+=/?~!@#$%^&*{}[]()_";

    for (let i = 0; i < state.length; i++) {
      let index = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(index);
    }
    setState((prevState) => ({ ...prevState, password: pass }));
  }, [state.length, state.includeNumbers, state.includeSpecialChar]);

  const copyPasswordOnClipboard = () => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(state.password);
  };

  useEffect(() => {
    generatePassword();
  }, [
    state.length,
    state.includeNumbers,
    state.includeSpecialChar,
    generatePassword,
  ]);

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : parseInt(value, 10),
    }));
  };

  return (
    <>
      <h1>Generate Your Random Password</h1>
      <div className={styles["showcase-box"]}>
        <input
          type="text"
          value={state.password}
          readOnly
          ref={passwordRef}
        ></input>
        <button onClick={copyPasswordOnClipboard}>Copy</button>
      </div>
      <div className={styles["input-container"]}>
        <div className={styles["inputs"]}>
          <input
            type="range"
            min={5}
            max={100}
            id="length"
            value={state.length}
            onChange={handleChange}
          ></input>
          <label htmlFor="length">Length: {state.length}</label>
        </div>
        <div className={styles["inputs"]}>
          <input
            type="checkbox"
            defaultChecked={state.includeNumbers}
            id="includeNumbers"
            onChange={handleChange}
          ></input>
          <label htmlFor="includeNumbers">Include Numbers</label>
        </div>
        <div className={styles["inputs"]}>
          <input
            type="checkbox"
            defaultChecked={state.includeSpecialChar}
            id="includeSpecialChar"
            onChange={handleChange}
          ></input>
          <label htmlFor="includeSpecialChar">Special Characters</label>
        </div>
      </div>
    </>
  );
}

export default MainSection;
