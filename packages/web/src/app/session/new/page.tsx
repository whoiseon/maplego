import AuthForm from "@/components/desktop/auth/AuthForm";
import tw, { styled } from "twin.macro";

function SignInPage() {
  return (
    <div className="flex justify-center w-screen">
      <AuthForm />
    </div>
  );
}

export default SignInPage;
