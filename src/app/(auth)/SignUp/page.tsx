import Loading from "@/app/loading";
import MultiStepForm from "@/components/Forms/Signup/SignupForm";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<Loading />}></Suspense>
      <MultiStepForm />
    </div>
  );
}
