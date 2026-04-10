import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link"
import React from "react"

type Props = {
    type: "success" | "error",
    title: string,
    message: React.ReactNode,
    buttonText: string,
    link: string,
    open: boolean,
    setOpen: (open: boolean) => void
}

export default function AlertMessage({ type, title, message, buttonText, link, open, setOpen }: Props) {
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
                    {type === "success" && (
                        <Link href={link}>
                            <AlertDialogCancel className="dark cursor-pointer" onClick={() => setOpen(false)}>
                                {buttonText}
                            </AlertDialogCancel>
                        </Link>
                    )}
                    {type === "error" && (
                        <AlertDialogCancel className="dark cursor-pointer" onClick={() => setOpen(false)}>
                                {buttonText}
                        </AlertDialogCancel>
                    )}
                </AlertDialogFooter>
                
            </AlertDialogContent>
        </AlertDialog>
    )
}