"use client";

import {
  type ComponentProps,
  type RefObject,
  useEffect,
  useId,
  useRef,
} from "react";
import { cn } from "@/lib/utils";
import type { ValidError } from "@/lib/validator";
import { Input } from "./ui/input";

type Props = {
  label: string;
  type?: string;
  id?: string;
  name?: string;
  ref?: RefObject<HTMLInputElement | null>;
  focus?: boolean;
  error?: ValidError;
  placeholder?: string;
  className?: string;
};

export default function LabelInput({
  label,
  type,
  id,
  name,
  ref,
  focus,
  error,
  placeholder,
  className,
  ...props
}: Props & ComponentProps<"input">) {
  const uniqName = useId();
  const inpRef = useRef<HTMLInputElement>(null);
  const err = !!error && name && error[name] ? error[name].errors : [];

  useEffect(() => {
    if (!focus || !err.length) return;
    if (ref) ref.current?.focus();
    else inpRef.current?.focus();
  }, [focus, ref, err]);

  return (
    <label htmlFor={uniqName} className="font-semibold text-sm capitalize">
      {label}
      <Input
        type={type || "text"}
        id={uniqName}
        name={name || uniqName}
        ref={ref || inpRef}
        placeholder={placeholder || ""}
        className={cn(
          "bg-pink-400 font-normal text-white placeholder:text-gray-300 focus:bg-white",
          className
        )}
        {...props}
      />
      {err.map((e) => (
        <span key={e} className="text-red-400">
          {e}
        </span>
      ))}
    </label>
  );
}
