interface LoginFormProps {}

export function LoginForm(props: LoginFormProps) {
  return (
    <div>
      <form>
        <input type="email" placeholder="Email"></input>
        <input type="password" placeholder="Password"></input>
        <input type="password" placeholder="Confirm password"></input>
        <button type="submit" disabled>
          Submit
        </button>
      </form>
    </div>
  );
}
