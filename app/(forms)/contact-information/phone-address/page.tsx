"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useFormContextCustom } from "@/contexts/form-context";
import { useEffect } from "react";
import { getStepData, setStepData } from "@/utils/form-storage";

type PhoneAddressFormData = {
  phone: string;
  address: string;
};

export default function PhoneAddressForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<PhoneAddressFormData>({
  });

  const { navigateToNextForm, navigateToPreviousForm, markFormComplete } =
    useFormContextCustom();

  useEffect(() => {
    const saved = getStepData("Phone & Address");
    if (saved) { 
      reset(saved); 
    }
  }, [reset]);

  const onSubmit = (data: PhoneAddressFormData) => {
    console.log("Submitted:", data);
    setStepData("Phone & Address", data)
    markFormComplete("Phone & Address");
    navigateToNextForm();
  };

  return (
    <div>
      {" "}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Phone & Address</h2>
        <p className="text-sm text-muted-foreground">
          Please provide your details.
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,}$/,
                  message: "Phone must be at least 10 digits",
                },
              })}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
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
