import React from "react"
import { useToast as useToastHook } from "@/components/ui/use-toast"

export * from "@/components/ui/toast"

type Toast = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

const SHOW_TOAST_DURATION = 3000

function useToast() {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const toast = (toast: Toast) => {
    setToasts((prevToasts) => [...prevToasts, toast])

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1))
    }, SHOW_TOAST_DURATION)
  }

  return {
    toasts,
    toast,
  }
}

export { useToast, useToastHook as default }

