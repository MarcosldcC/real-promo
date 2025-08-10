"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import { cn } from "@/lib/utils"

function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger(
  props: React.ComponentProps<typeof DialogPrimitive.Trigger>
) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal(
  props: React.ComponentProps<typeof DialogPrimitive.Portal>
) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose(props: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

type DialogContentProps = React.ComponentProps<
  typeof DialogPrimitive.Content
> & {
  /**
   * Título acessível padrão quando nenhum DialogTitle é encontrado nos children.
   * Use para descrever o propósito do modal de forma concisa.
   */
  a11yTitle?: string
  /**
   * Se true, o título gerado automaticamente (quando necessário) ficará invisível
   * visualmente, mas legível por leitores de tela.
   */
  hideAutoTitle?: boolean
  showCloseButton?: boolean
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  a11yTitle = "Dialog",
  hideAutoTitle = true,
  ...props
}: DialogContentProps) {
  // Detecta de forma rasa se há um DialogTitle nos children (evita títulos duplicados)
  const hasExplicitTitle = React.useMemo(() => {
    const arr = React.Children.toArray(children)
    return arr.some((child) => {
      if (!React.isValidElement(child)) return false
      const t = child.type
      return (
        t === DialogPrimitive.Title ||
        // Suporte ao nosso wrapper abaixo
        (typeof t === "function" && (t as any).displayName === "DialogTitle")
      )
    })
  }, [children])

  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed left-1/2 top-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=closed]:fade-out-0 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {/* Se nenhum título explícito foi encontrado, criamos um automaticamente */}
        {!hasExplicitTitle &&
          (hideAutoTitle ? (
            <VisuallyHidden>
              <DialogPrimitive.Title>{a11yTitle}</DialogPrimitive.Title>
            </VisuallyHidden>
          ) : (
            <div data-slot="dialog-header" className="flex flex-col gap-2">
              <DialogPrimitive.Title className="text-lg font-semibold leading-none">
                {a11yTitle}
              </DialogPrimitive.Title>
            </div>
          ))}

        {children}

        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="absolute right-4 top-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring ring-offset-background focus:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            aria-label="Fechar"
          >
            <XIcon />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg font-semibold leading-none", className)}
      {...props}
    />
  )
}
DialogTitle.displayName = "DialogTitle"

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
