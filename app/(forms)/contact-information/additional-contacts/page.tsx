"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useFormContextCustom } from "@/contexts/form-context";
import { useEffect } from "react";
import { getStepData, setStepData } from "@/utils/form-storage";

type AdditionalContactsFormData = {
  city: string;
  zip: string;
};

export default function AdditionalContactsForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AdditionalContactsFormData>({
    mode: "onChange",
  });

  useEffect(() => {
      const saved = getStepData("Additional Contacts");
      if (saved) { 
        reset(saved);
      }
    }, [reset]);

  const { navigateToNextForm, navigateToPreviousForm, markFormComplete } =
    useFormContextCustom();

  const onSubmit = (data: AdditionalContactsFormData) => {
    console.log("Submitted:", data);
    setStepData("Additional Contacts" , data);
    markFormComplete("Additional Contacts");
    navigateToNextForm();
  };

  return (
    <div>
      {" "}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Additional Contacts</h2>
        <p className="text-sm text-muted-foreground">
          Please provide your details.
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              {...register("city", { required: "City is required" })}
            />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="zip">Zip Code</Label>
            <Input
              id="zip"
              {...register("zip", {
                required: "Zip code is required",
                pattern: {
                  value: /^[0-9]{4,10}$/,
                  message: "Enter a valid zip code",
                },
              })}
            />
            {errors.zip && (
              <p className="text-sm text-red-500">{errors.zip.message}</p>
            )}
          </div>

          <Button
            type="submit"
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
