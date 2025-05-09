"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFormContextCustom } from "@/contexts/form-context";
import { getStepData, setStepData } from "@/utils/form-storage";

type TermsFormData = {
  interests: string[];
  agreeToTerms: boolean;
};

export default function TermsAndInterestsForm() {
  const {
    // register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<TermsFormData>({
    mode: "onChange",
    defaultValues: {
      interests: [],
      agreeToTerms: false,
    },
  });

  const { navigateToNextForm, navigateToPreviousForm, markFormComplete } =
    useFormContextCustom();

  const agreeToTerms = watch("agreeToTerms");

  useEffect(() => {
    const saved = getStepData("Terms & Interests");
    if (saved) {
      if (saved.interests) {
        setValue("interests", saved.interests);
      }
      if (saved.agreeToTerms !== undefined) {
        setValue("agreeToTerms", saved.agreeToTerms);
      }

      trigger();
    }
  }, [setValue, trigger]);

  const onSubmit = (data: TermsFormData) => {
    console.log("Submitted:", data);
    setStepData("Terms & Interests", data);
    markFormComplete("Terms & Interests");
    navigateToNextForm();
  };

  const selectedInterests = watch("interests") || [];

  const toggleInterest = (interest: string) => {
    const updated = selectedInterests.includes(interest)
      ? selectedInterests.filter((item) => item !== interest)
      : [...selectedInterests, interest];

    setValue("interests", updated, { shouldValidate: true });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Terms & Interests</h2>
        <p className="text-sm text-muted-foreground">
          Select your interests and agree to the terms and conditions to
          proceed.
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-sm">
          <div>
            <Label className="mb-2 block">Select Your Interests</Label>
            {["Technology", "Art", "Sports", "Other"].map((interest) => (
              <div className="flex items-center space-x-2" key={interest}>
                <Checkbox
                  id={interest}
                  checked={selectedInterests.includes(interest)}
                  onCheckedChange={() => toggleInterest(interest)}
                />
                <Label htmlFor={interest}>{interest}</Label>
              </div>
            ))}
            {errors.interests && (
              <p className="text-sm text-red-500 mt-1">
                Please select at least one interest.
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeToTerms"
              checked={agreeToTerms}
              onCheckedChange={(checked) =>
                setValue("agreeToTerms", !!checked, { shouldValidate: true })
              }
            />
            <Label htmlFor="agreeToTerms">
              I agree to the terms and conditions
            </Label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm text-red-500 mt-1">
              {errors.agreeToTerms.message}
            </p>
          )}

          <Button
            type="button"
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
