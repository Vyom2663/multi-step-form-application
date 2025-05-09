"use client";

import { useEffect} from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useFormContextCustom } from "@/contexts/form-context";
import { getStepData, setStepData } from "@/utils/form-storage";

type ProfessionalDetailsFormData = {
  occupation: string;
  role: string;
  company: string;
};

export default function ProfessionalDetailsForm() {
 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ProfessionalDetailsFormData>({
    mode: "onChange",
  });

  const { navigateToNextForm, navigateToPreviousForm, markFormComplete } =
    useFormContextCustom();

  useEffect(() => {
    const saved = getStepData("Professional Details");
    if (saved) {
      reset(saved);
    }
  }, [reset]);

  const onSubmit = (data: ProfessionalDetailsFormData) => {
    console.log("Submitted:", data);
    setStepData("Professional Details", data);
    markFormComplete("Professional Details");
    navigateToNextForm();
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Professional Details</h2>
        <p className="text-sm text-muted-foreground">
          Please provide your details.
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
          <div>
            <Label htmlFor="occupation">Occupation</Label>
            <Input
              id="occupation"
              {...register("occupation", {
                required: "Occupation is required",
              })}
            />
            {errors.occupation && (
              <p className="text-sm text-red-500">
                {errors.occupation.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              {...register("role", { required: "Role is required" })}
            />
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="company">Company (Optional)</Label>
            <Input id="company" {...register("company")} />
          </div>

          <Button
            type="button" // Set button type to 'button' to prevent form submission
            className="bg-white text-black hover:bg-black hover:text-white cursor-pointer mr-2"
            onClick={navigateToPreviousForm}
          >
            Previous
          </Button>
          <Button
            type="submit"
            disabled={!isValid}
            className="bg-violet-900 hover:bg-violet-900 cursor-pointer"
          >
            Next
          </Button>
        </form>
      </div>
    </div>
  );
}
