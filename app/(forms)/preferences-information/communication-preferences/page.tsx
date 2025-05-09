"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useFormContextCustom } from "@/contexts/form-context";
import { getStepData, setStepData } from "@/utils/form-storage";

type CommunicationPreferencesData = {
  method: string;
};

export default function CommunicationPreferencesForm() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<CommunicationPreferencesData>({
    mode: "onChange",
    defaultValues: {
      method: "",
    },
  });

  const { navigateToNextForm, navigateToPreviousForm, markFormComplete } =
    useFormContextCustom();

  // Load from localStorage
  useEffect(() => {
    const saved = getStepData("Communication Preferences");
    if (saved?.method) {
      setValue("method", saved.method, { shouldValidate: true });
    }
  }, [setValue]);

  const onSubmit = (data: CommunicationPreferencesData) => {
    console.log("Submitted:", data);
    setStepData("Communication Preferences" , data);
    markFormComplete("Communication Preferences");
    navigateToNextForm();
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Communication Preferences</h2>
        <p className="text-sm text-muted-foreground">
          Select your suitable communication method.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
        <div>
          <Label className="block mb-2">Preferred Communication Method</Label>
          <Controller
            control={control}
            name="method"
            rules={{ required: "Please select a method" }}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} value={field.value}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="phone" />
                  <Label htmlFor="phone">Phone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sms" id="sms" />
                  <Label htmlFor="sms">SMS</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.method && (
            <p className="text-sm text-red-500 mt-1">{errors.method.message}</p>
          )}
        </div>

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
  );
}
