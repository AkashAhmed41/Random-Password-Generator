import React from "react";

import styles from "./footer.module.css";

function FooterSection() {
  return (
    <div className={styles.footer}>
      By default it generates an 8 character long password for you with a
      combination of the English capital and small letters. You are then allowed
      to change the password length, include numerical values and special
      characters to generate a strong password.
    </div>
  );
}

export default FooterSection;
