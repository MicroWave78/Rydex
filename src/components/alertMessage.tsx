"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import React from "react"
import { useRouter } from "next/navigation"

type Props = {
    type: "success" | "error",
    title: string,
    message: React.ReactNode,
    buttonText: string,
    link: string,
    open: boolean,
    setOpen: (open: boolean) => void,
    onConfirm?: () => void,
    secondaryButtonText?: string,
    onSecondaryConfirm?: () => void,
}

export default function AlertMessage({ type, title, message, buttonText, link, open, setOpen, onConfirm, secondaryButtonText, onSecondaryConfirm }: Props) {
    const router = useRouter();

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>

            <AlertDialogContent className="dark">
                <AlertDialogHeader>
                    <AlertDialogTitle className={type === "success" ? "text-green-400" : "text-red-400"}>
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {message}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-center items-center">
                    {type === "success" && buttonText && (
                        <AlertDialogCancel className="dark cursor-pointer" onClick={() => {
                            setOpen(false);
                            onConfirm?.();
                            router.push(link);
                            router.refresh();
                        }}>
                            {buttonText}
                        </AlertDialogCancel>
                    )}
                    {type === "error" && buttonText && (
                        <AlertDialogCancel className="dark cursor-pointer" onClick={() => {
                            setOpen(false);
                            onConfirm?.();
                            }}>
                                {buttonText}
                        </AlertDialogCancel>
                    )}
                    {secondaryButtonText && (
                        <AlertDialogCancel className="dark cursor-pointer" onClick={() => {
                            setOpen(false);
                            onSecondaryConfirm?.();
                        }}>
                            {secondaryButtonText}
                        </AlertDialogCancel>
                    )}
                </AlertDialogFooter>
                
            </AlertDialogContent>
        </AlertDialog>
    )
}