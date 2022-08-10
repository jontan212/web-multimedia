import React from "react";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <header>
      <div className={styles.profilePicture}>
        <img src="./img/profile.png" alt="Profile"></img>
      </div>
      <div>
        <ul>
          <li>Inicio</li>
          <li>
            Guía relleno
            <ul>
              <li>
                <a href="#1">One piece</a>
              </li>
              <li>
                <a href="#1">Naruto shippuden</a>
              </li>
            </ul>
          </li>
        </ul>
        <a href="#1">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.002 3H5.00201C3.89901 3 3.00201 3.897 3.00201 5V9H5.00201V5H19.002V19H5.00201V15H3.00201V19C3.00201 20.103 3.89901 21 5.00201 21H19.002C20.105 21 21.002 20.103 21.002 19V5C21.002 3.897 20.104 3 19.002 3Z"
              fill="black"
            />
            <path d="M11 16L16 12L11 8V11.001H3V13.001H11V16Z" fill="black" />
          </svg>
          Salir
        </a>
      </div>
    </header>
  );
}
