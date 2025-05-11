import GoogleForm from "@/app/_components/forms/GoogleForm";
import SignUpForm from "@/app/_components/forms/SignUpForm";
import React from "react";

const page = () => {
  return (
    <div>
      <SignUpForm>
        <GoogleForm />
      </SignUpForm>
    </div>
  );
};

export default page;
