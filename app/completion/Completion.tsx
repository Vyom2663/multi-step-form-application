"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { useFormContextCustom } from "@/contexts/form-context";

export default function Completion() {
  const router = useRouter();

  const { resetFormProgress } = useFormContextCustom();

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card className="shadow-lg border-purple-400">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto my-4 bg-purple-200 rounded-full p-4 w-16 h-16 flex items-center justify-center">
            <Check className="h-8 w-8 text-form-purple" />
          </div>
          <CardTitle className="text-2xl font-bold text-purple-400">
            All Forms Completed!
          </CardTitle>
          <CardDescription>
            Thank you for completing all the forms.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4 text-center">
          <p className="text-muted-foreground">
            Your information has been saved successfully. You can view your
            submission on the dashboard or start over.
          </p>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 justify-center">
            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="flex-1 cursor-pointer"
            >
              Go to Dashboard
            </Button>
            <Button
              className="flex-1 bg-purple-500 hover:bg-purple-900 cursor-pointer"
              onClick={resetFormProgress}
            >
              Start Over
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
