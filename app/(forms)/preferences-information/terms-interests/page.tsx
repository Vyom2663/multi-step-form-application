"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFormContextCustom } from "@/contexts/form-context";
import { getStepData, setStepData } from "@/utils/form-storage";
import { Input } from "@/components/ui/input";

type TermsFormData = {
  interests: string[];
  agreeToTerms: boolean;
};

export default function TermsAndInterestsForm() {
  const {
    register,
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

  const selectedInterests = watch("interests") || [];
  const agreeToTerms = watch("agreeToTerms");

  useEffect(() => {
    const saved = getStepData("Terms & Interests");
    if (saved) {
      if (saved.interests) {
        setValue("interests", saved.interests, { shouldValidate: true });
      }
      if (saved.agreeToTerms !== undefined) {
        setValue("agreeToTerms", saved.agreeToTerms, { shouldValidate: true });
      }
    }
    trigger();
  }, [setValue, trigger]);

  const onSubmit = (data: TermsFormData) => {
    setStepData("Terms & Interests", data);
    markFormComplete("Terms & Interests");
    navigateToNextForm();
  };

  const handleInterestChange = (interest: string) => {
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-sm">
        <div>
          <Label className="mb-2 block">Select Your Interests</Label>
          {["Technology", "Art", "Sports", "Other"].map((interest) => (
            <div className="flex items-center space-x-2" key={interest}>
              <Checkbox
                id={interest}
                checked={selectedInterests.includes(interest)}
                onCheckedChange={() => handleInterestChange(interest)}
              />
              <Label htmlFor={interest}>{interest}</Label>
            </div>
          ))}
          <input
            type="hidden"
            {...register("interests", {
              validate: (value) =>
                value.length > 0 || "Please select at least one interest",
            })}
          />
          {errors.interests && (
            <p className="text-sm text-red-500 mt-1">
              {errors.interests.message}
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
          <Label htmlFor="agreeToTerms" className="text-red-500">
            I agree to the terms and conditions
          </Label>
        </div>
        <Input
          type="hidden"
          {...register("agreeToTerms", {
            validate: (value) =>
              value === true || "You must agree to the terms",
          })}
        />
        {errors.agreeToTerms && (
          <p className="text-sm text-red-500 mt-1">
            {errors.agreeToTerms.message}
          </p>
        )}

        <div className="flex gap-2">
          <Button
            type="button"
            className="bg-white text-black hover:bg-black hover:text-white cursor-pointer"
            onClick={navigateToPreviousForm}
          >
            Previous
          </Button>
          <Button
            type="submit"
            disabled={!isValid}
            className="bg-violet-900 hover:bg-violet-900 cursor-pointer text-white"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
