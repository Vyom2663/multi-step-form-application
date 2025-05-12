"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContextCustom } from "@/contexts/form-context";
import { getStepData, setStepData } from "@/utils/form-storage";

type BasicDetailsFormData = {
  name: string;
  email: string;
  gender: string;
};

export default function BasicDetailsForm() {
  const [defaultValues, setDefaultValues] = useState<BasicDetailsFormData>({
    name: "",
    email: "",
    gender: "",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<BasicDetailsFormData>({
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    const saved = getStepData("Basic Details");
    if (saved) {
      setDefaultValues(saved);
    }
  }, []);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);


  const { navigateToNextForm, navigateToPreviousForm, markFormComplete } =
    useFormContextCustom();

  const onSubmit = (data: BasicDetailsFormData) => {
    console.log("Submitted:", data);
    setStepData("Basic Details", data);
    markFormComplete("Basic Details");
    navigateToNextForm();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Basic Details</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Please provide your basic information.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Controller
            control={control}
            name="gender"
            rules={{ required: "Gender is required" }}
            render={({ field }) => {
             
              return (
                <Select
                  value={field.value ?? ""}
                  onValueChange={(val) => {
                    if(val) field.onChange(val);
                  }}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              );
            }}
          />
          {errors.gender && (
            <p className="text-sm text-red-500">{errors.gender.message}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            className="bg-white text-black hover:bg-black hover:text-white cursor-pointer mr-2"
            onClick={navigateToPreviousForm}
          >
            Previous
          </Button>
          <Button
            type="submit"
            className="bg-violet-900 hover:bg-violet-900 cursor-pointer"
            disabled={!isValid}
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
