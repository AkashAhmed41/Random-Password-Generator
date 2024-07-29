import { useCallback, useEffect, useState, useRef } from "react";

import "./App.css";

function App() {
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
    <div className="container">
      <h1>Generate Your Random Password</h1>
      <div className="showcase-box">
        <input type="text" value={password} readOnly ref={passwordRef}></input>
        <button onClick={copyPasswordOnClipboard}>Copy</button>
      </div>
      <div className="input-container">
        <div>
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
        <div>
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
        <div>
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
      <div className="footer">
        By default it generates an 8 character long password for you with a
        combination of the English capital and small letters. You are then
        allowed to change the password length, include numerical values and
        special characters to generate a strong password.
      </div>
    </div>
  );
}

export default App;
