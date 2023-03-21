import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const index = () => {
  const [signModal, setSignModal] = useState(false);

  return (
    <div className="form-connexion">
      <div className="form-container">
        <ul>
          <div>
            <li
              id="register"
              className={!signModal ? "active-btn" : null}
              onClick={() => setSignModal(false)}
            >
              S'inscrire
            </li>
          </div>
          <div>
            <li
              id="login"
              className={signModal ? "active-btn" : null}
              onClick={() => setSignModal(true)}
            >
              Se connecter
            </li>
          </div>
        </ul>
        {signModal ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

export default index;
