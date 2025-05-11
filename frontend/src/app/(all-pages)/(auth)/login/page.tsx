import GoogleForm from "@/app/_components/forms/GoogleForm";
import LoginForm from "@/app/_components/forms/LoginForm";
import React from "react";

const page = () => {
  return (
    <div>
      <LoginForm>
        <GoogleForm />
      </LoginForm>
    </div>
  );
};

export default page;
