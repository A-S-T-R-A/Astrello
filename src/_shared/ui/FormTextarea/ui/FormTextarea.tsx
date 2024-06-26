"use client";

import { useFormStatus } from "react-dom";
import { KeyboardEventHandler, forwardRef } from "react";
import { cn } from "@/_shared/lib/cn";
import { Label } from "../../Label";
import { Textarea } from "../../Textarea";
import { FormErrors } from "../../FormErrors";

interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  defaultValue?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>((props, ref) => {
  const { id, label, placeholder, required, disabled, errors, onBlur, onClick, onKeyDown, className, defaultValue } =
    props;
  const { pending } = useFormStatus();

  return (
    <div className="space-y-2 w-full">
      <div className="space-y-1 w-full">
        {label ? (
          <Label htmlFor={id} className="text-xs font-semibold text-neutral-700">
            {label}
          </Label>
        ) : null}
        <Textarea
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          onClick={onClick}
          ref={ref}
          required={required}
          placeholder={placeholder}
          name={id}
          id={id}
          disabled={pending || disabled}
          className={cn(
            "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
            className
          )}
          aria-describedby={`${id}-error`}
          defaultValue={defaultValue}
        />
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  );
});

FormTextarea.displayName = "FormTextarea";
