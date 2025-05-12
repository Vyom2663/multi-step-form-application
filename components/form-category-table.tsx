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
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation"; // ✅ import router
import { useFormContextCustom } from "@/contexts/form-context";
import { cn } from "@/lib/utils";
import { CheckCircle, Circle, Edit3, PlayCircle } from "lucide-react";

type Form = {
  name: string;
  path: string;
};

type Props = {
  title: string;
  forms: Form[];
};

export default function FormCategoryTable({ title, forms }: Props) {
  const [completedForms, setCompletedForms] = useState<string[]>([]);
  const { setCurrentForm, isFormUnlocked } = useFormContextCustom();
  const router = useRouter(); // ✅ initialize router

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("completedForms") || "[]");
    setCompletedForms(saved);
  }, []);

  const getStatus = (formName: string) =>
    completedForms.includes(formName) ? "Completed" : "Not Started";

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-violet-700 mb-4">{title}</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Form Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forms.map(({ name, path }) => {
            const status = getStatus(name);
            const unlocked = isFormUnlocked(name);
            const isCompleted = status === "Completed";

            return (
              <TableRow key={name}>
                <TableCell className="flex items-center space-x-2">
                  {isCompleted ? (
                    <CheckCircle className="text-green-600 w-5 h-5" />
                  ) : (
                    <Circle
                      className={cn(
                        "w-5 h-5",
                        unlocked ? "text-gray-400" : "text-gray-300"
                      )}
                    />
                  )}
                  <span>{name}</span>
                </TableCell>

                <TableCell>
                  <Badge variant={isCompleted ? "success" : "secondary"}>
                    {status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    onClick={() => {
                      if (unlocked) {
                        setCurrentForm(name);
                        router.push(path);
                      } else {
                        console.warn("Form is locked");
                      }
                    }}
                    variant={isCompleted ? "outline" : "default"}
                    className={cn(
                      "flex items-center space-x-2",
                      !unlocked && "opacity-50 grayscale cursor-not-allowed"
                    )}
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
