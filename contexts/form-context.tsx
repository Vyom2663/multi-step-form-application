"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import LoadingSpinner from "./loading";

const formOrder = [
  "Basic Details",
  "Additional Details",
  "Professional Details",
  "Phone & Address",
  "Additional Contacts",
  "Communication Preferences",
  "Terms & Interests",
];

const formRoutes: Record<string, string> = {
  "Basic Details": "/personal-information/basic-details",
  "Additional Details": "/personal-information/additional-details",
  "Professional Details": "/personal-information/professional-details",
  "Phone & Address": "/contact-information/phone-address",
  "Additional Contacts": "/contact-information/additional-contacts",
  "Communication Preferences":
    "/preferences-information/communication-preferences",
  "Terms & Interests": "/preferences-information/terms-interests",
};

type FormContextType = {
  currentForm: string;
  completedForms: string[];
  navigateToNextForm: () => void;
  navigateToPreviousForm: () => void;
  isFormUnlocked: (formName: string) => boolean;
  setCurrentForm: (form: string) => void;
  markFormComplete: (formName: string) => void;
  resetFormProgress: () => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [currentForm, setCurrentForm] = useState(formOrder[0]);
  const [completedForms, setCompletedForms] = useState<string[]>([]);
  const [hasCheckedAccess, setHasCheckedAccess] = useState(false);

  const markFormComplete = (formName: string) => {
    const updated = [...new Set([...completedForms, formName])];
    localStorage.setItem("completedForms", JSON.stringify(updated));
    setCompletedForms(updated);
  };

  const navigateToNextForm = () => {
    const currentIndex = formOrder.indexOf(currentForm);
    if (currentIndex < formOrder.length - 1) {
      const nextForm = formOrder[currentIndex + 1];
      router.push(formRoutes[nextForm]);
      toast.success("Thank You. You can move to next step!!");
    } else {
      router.push("/completion");
      toast.success("All steps completed!!");
    }
  };

  const navigateToPreviousForm = () => {
    const currentIndex = formOrder.indexOf(currentForm);
    if (currentIndex > 0) {
      const prevForm = formOrder[currentIndex - 1];
      router.push(formRoutes[prevForm]);
    }
  };

  const isFormUnlocked = (formName: string) => {
    const index = formOrder.indexOf(formName);
    if (index === 0) return true;
    return completedForms.includes(formOrder[index - 1]);
  };

  const resetFormProgress = () => {
    localStorage.removeItem("completedForms");
    localStorage.removeItem("multiStepFormData");
    setCompletedForms([]);
    setCurrentForm(formOrder[0]);
    router.push("/");
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("completedForms") || "[]");
    setCompletedForms(stored);
  }, []);

  useEffect(() => {
    const found = formOrder.find((name) => formRoutes[name] === pathname);
    if (found) {
      setCurrentForm(found);
    }
  }, [pathname]);

  useEffect(() => {
    const found = formOrder.find((name) => formRoutes[name] === pathname);
    if (!found) {
      setHasCheckedAccess(true);
      return;
    }

    const index = formOrder.indexOf(found);

    if (index === 0 || completedForms.includes(formOrder[index - 1])) {
      setCurrentForm(found);
      setHasCheckedAccess(true);
    } else {
      const lastUnlockedIndex = completedForms.length;
      const lastUnlockedForm = formOrder[Math.max(0, lastUnlockedIndex)];
      router.push(formRoutes[lastUnlockedForm]);
    }
  }, [pathname, completedForms, router]);

  if (!hasCheckedAccess) return <LoadingSpinner />;

  return (
    <FormContext.Provider
      value={{
        currentForm,
        completedForms,
        navigateToNextForm,
        navigateToPreviousForm,
        isFormUnlocked,
        setCurrentForm,
        markFormComplete,
        resetFormProgress,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContextCustom = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContextCustom must be used within FormProvider");
  }
  return context;
};
