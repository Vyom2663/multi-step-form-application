"use client";

import { useFormContextCustom } from "@/contexts/form-context";
import BasicDetailsForm from "@/app/(forms)/personal-information/basic-details/page";
import AdditionalDetailsForm from "@/app/(forms)/personal-information/additional-details/page";
import ProfessionalDetailsForm from "@/app/(forms)/personal-information/professional-details/page";
// import others...

const formComponents: Record<string, React.FC> = {
  "Basic Details": BasicDetailsForm,
  "Additional Details": AdditionalDetailsForm,
  "Professional Details": ProfessionalDetailsForm,
};

export default function FormStepPage() {
  const { currentForm } = useFormContextCustom();
  const CurrentForm = formComponents[currentForm];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Fill Out Your Information</h1>
      {CurrentForm ? <CurrentForm /> : <p>Form not found.</p>}
    </div>
  );
}
