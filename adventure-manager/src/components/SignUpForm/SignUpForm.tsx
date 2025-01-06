'use client'
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export const SignUpForm : React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize the useRouter hook
  const signup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/signup", {
        userName: userName,
        password: password,
      });
      if(response.status === 201){
        router.push("/")
      }
    } catch (error) {
      console.log(error);
    }
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
