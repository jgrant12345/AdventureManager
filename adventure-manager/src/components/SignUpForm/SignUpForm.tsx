import { FormEvent, useState } from "react";
import axios from "axios";

export default function SignUpForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const signup = async (e: FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   const response = await axios.post('/api/signup', {
    userName: userName,
    password: password
  });
  };
  return (
    <form onSubmit={signup}>
      <label>
        {" "}
        Username:
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserName(e.target.value)
          }
          required
        ></input>
      </label>
      <label>
        Password
        <input
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        ></input>
      </label>
      <button>Signup</button>
    </form>
  );
}
