import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "./main.module.css";

function MainSection() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChar, setincludeSpecialChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QAZWSXEDCRFVTGBYHNUJMIKOLPqazwsxedcrfvtgbyhnujmikolp";

    if (includeNumbers) str += "0123456789";
    if (includeSpecialChar) str += "+=/?~!@#$%^&*{}[]()_";

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, includeNumbers, includeSpecialChar]);

  const copyPasswordOnClipboard = () => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, includeNumbers, includeSpecialChar, passwordGenerator]);

  return (
    <>
      <h1>Generate Your Random Password</h1>
      <div className={styles["showcase-box"]}>
        <input type="text" value={password} readOnly ref={passwordRef}></input>
        <button onClick={copyPasswordOnClipboard}>Copy</button>
      </div>
      <div className={styles["input-container"]}>
        <div className={styles["inputs"]}>
          <input
            type="range"
            min={5}
            max={100}
            id="length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          ></input>
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className={styles["inputs"]}>
          <input
            type="checkbox"
            defaultChecked={includeNumbers}
            id="includeNum"
            onChange={() => {
              setIncludeNumbers((prev) => !prev);
            }}
          ></input>
          <label htmlFor="includeNum">Include Numbers</label>
        </div>
        <div className={styles["inputs"]}>
          <input
            type="checkbox"
            defaultChecked={includeSpecialChar}
            id="specialChar"
            onChange={() => {
              setincludeSpecialChar((prev) => !prev);
            }}
          ></input>
          <label htmlFor="specialChar">Special Characters</label>
        </div>
      </div>
    </>
  );
}

export default MainSection;
