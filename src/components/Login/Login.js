import React from "react";
import styles from "./styles.module.css";

export default function Login() {
  return (
    <div className={styles.login}>
      <h1>Seleccione su perfil</h1>
      <div className={styles.userAccounts}>
        {/* USUARIO 1 */}
        <div>
          <div className={styles.profilePicture}>
            <img src="./img/profile.png" alt="profile"></img>
          </div>
          <p>Name</p>
        </div>
        {/* USUARIO 2 */}
        <div>
          <div className={styles.profilePicture}>
            <img src="./img/profile.png" alt="profile"></img>
          </div>
          <p>Name</p>
        </div>
        {/* USUARIO 3 */}
        <div>
          <div className={styles.profilePicture}>
            <img src="./img/profile.png" alt="profile"></img>
          </div>
          <p>Name</p>
        </div>
      </div>
    </div>
  );
}
