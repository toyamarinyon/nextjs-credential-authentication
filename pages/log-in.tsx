import { signIn } from "next-auth/client";
export default function LogInPage() {
  return (
    <div className="container mx-auto">
      <button
        onClick={() => {
          signIn("email-password", {
            email: "test",
            password: "secret",
            callbackUrl: `${window.location.origin}`,
          });
        }}
      >
        Sign In
      </button>
    </div>
  );
}
