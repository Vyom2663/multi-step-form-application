"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useFormContextCustom } from "@/contexts/form-context";
import { CheckCircle, Circle, Edit3, PlayCircle,Lock } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const formStructure = [
  {
    category: "Personal Information",
    forms: ["Basic Details", "Additional Details", "Professional Details"],
  },
  {
    category: "Contact Information",
    forms: ["Phone & Address", "Additional Contacts"],
  },
  {
    category: "Preferences",
    forms: ["Communication Preferences", "Terms & Interests"],
  },
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

export default function Dashboard() {
  const [completedForms, setCompletedForms] = useState<string[]>([]);
  const { setCurrentForm, isFormUnlocked } = useFormContextCustom();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("completedForms") || "[]");
    setCompletedForms(saved);
  }, []);

  const allForms = formStructure.flatMap((section) => section.forms);
  const getStatus = (formName: string) =>
    completedForms.includes(formName) ? "Completed" : "Not Started";

  const overallProgress = Math.round(
    (completedForms.length / allForms.length) * 100
  );

  return (
    <div className="p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-4 text-violet-700">
        📋 Form Dashboard
      </h1>

      <div className="mb-6">
        <p className="text-base font-medium mb-2 text-gray-700">
          Overall Progress:{" "}
          <span className="font-bold">{overallProgress}%</span>
        </p>
        <Progress value={overallProgress} />
      </div>

      <Table className="rounded-lg border shadow-md">
        <TableHeader className="bg-gray-100 text-gray-600 uppercase text-sm tracking-wider">
          <TableRow>
            <TableHead>Form</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formStructure.map((section) => (
            <React.Fragment key={section.category}>
              <TableRow className="bg-gray-50">
                <TableCell
                  colSpan={3}
                  className="font-bold text-violet-800 text-md"
                >
                  {section.category}
                </TableCell>
              </TableRow>
              {section.forms.map((formName, index) => {
                const status = getStatus(formName);
                const isCompleted = status === "Completed";

                return (
                  <motion.tr
                    key={formName}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <TableCell className="flex items-center space-x-2 text-gray-800 font-medium">
                      {isCompleted ? (
                        <CheckCircle className="text-green-600 w-5 h-5" />
                      ) : (
                        <Circle className="text-gray-400 w-5 h-5" />
                      )}
                      <span>{formName}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={isCompleted ? "success" : "secondary"}
                        className="text-xs"
                      >
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {isFormUnlocked(formName) ? (
                        <Link href={formRoutes[formName]}>
                          <Button
                            onClick={() => setCurrentForm(formName)}
                            variant={isCompleted ? "outline" : "default"}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            {isCompleted ? (
                              <>
                                <Edit3 className="w-4 h-4" />
                                <span>Edit</span>
                              </>
                            ) : (
                              <>
                                <PlayCircle className="w-4 h-4" />
                                <span>Start</span>
                              </>
                            )}
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          disabled
                          variant="outline"
                          className="flex items-center space-x-2 opacity-50 cursor-not-allowed"
                        >
                          <Lock className="w-4 h-4" />
                          <span>Locked</span>
                        </Button>
                      )}
                    </TableCell>
                  </motion.tr>
                );
              })}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
