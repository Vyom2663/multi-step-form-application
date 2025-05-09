"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useFormContextCustom } from "@/contexts/form-context";
import { getStepData, setStepData } from "@/utils/form-storage";

type AdditionalDetailsFormData = {
  age: number;
};

export default function AdditionalDetailsForm() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AdditionalDetailsFormData>({
    mode: "onChange",
  });

  const { navigateToNextForm, navigateToPreviousForm, markFormComplete } =
    useFormContextCustom();

  useEffect(() => {
    const saved = getStepData("Additional Details");
    if (saved) {
      reset(saved); 
    }
  }, [reset]);

  const onSubmit = (data: AdditionalDetailsFormData) => {
    console.log("Submitted:", data);
    setStepData("Additional Details", data);
    markFormComplete("Additional Details");
    navigateToNextForm();
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Additional Details</h2>
        <p className="text-sm text-muted-foreground">
          Please provide your details.
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              {...register("age", {
                required: "Age is required",
                min: { value: 18, message: "Minimum age is 18" },
                max: { value: 99, message: "Maximum age is 99" },
              })}
            />
            {errors.age && (
              <p className="text-sm text-red-500">{errors.age.message}</p>
            )}
          </div>

          <Button
            type="button" // Changed type to button to prevent form submission
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
