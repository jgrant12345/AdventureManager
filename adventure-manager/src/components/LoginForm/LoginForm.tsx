import { FormEvent } from "react";

export default function LoginForm() {
  async function login(e: FormEvent) {
    e.preventDefault();
    console.log("testing");
    const login = await fetch("/api/login", {
      method: "post",
    });
    console.log("we made a post!");
  }

  return (
    <div>
      <form>
        <button onClick={(e) => login(e)}>login</button>
      </form>
    </div>
  );
}
