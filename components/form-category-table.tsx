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
import Link from "next/link";
import { useFormContextCustom } from "@/contexts/form-context";
import { PlayIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
                {/* Radio-style indicator and name */}
                <TableCell className="flex items-center space-x-2">
                  <span
                    className={cn(
                      "w-4 h-4 rounded-full border-2",
                      isCompleted
                        ? "border-green-500 bg-green-500"
                        : unlocked
                        ? "border-gray-400 bg-white"
                        : "border-gray-300 bg-gray-200"
                    )}
                  ></span>
                  <span>{name}</span>
                </TableCell>

                {/* Badge Status */}
                <TableCell>
                  <Badge variant={isCompleted ? "success" : "secondary"}>
                    {status}
                  </Badge>
                </TableCell>

                {/* Start/Edit button */}
                <TableCell className="text-right">
                  <Link href={path}>
                    <Button
                      onClick={() => setCurrentForm(name)}
                      disabled={!unlocked}
                      className={cn(
                        "flex items-center space-x-2",
                        !unlocked && "opacity-50 grayscale cursor-not-allowed",
                        isCompleted
                          ? "border border-gray-300"
                          : "bg-black hover:bg-black text-white cursor-pointer"
                      )}
                    >
                      <PlayIcon size={16} />
                      <span>{isCompleted ? "Edit" : "Start"}</span>
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
