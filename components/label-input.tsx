/** biome-ignore-all lint/correctness/useExhaustiveDependencies: useEffect dep-arr */
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
  defaultValue?: string | number;
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
  defaultValue,
  error,
  placeholder,
  className,
  ...props
}: Props & ComponentProps<"input">) {
  const uniqName = useId();
  const inpRef = useRef<HTMLInputElement>(null);

  const err = !!error && name && error[name] ? error[name].errors : [];
  const val =
    !!error && name && error[name] ? error[name].value?.toString() : "";

  useEffect(() => {
    if (!focus && !err.length) return;

    const keys = Object.keys(error ?? {});
    // console.log("*********", keys); // check how many times rendered
    if (!focus && (!err.length || keys[0] !== name)) return;

    if (ref) ref.current?.focus();
    else inpRef.current?.focus();
  }, [err]);

  return (
    <label htmlFor={uniqName} className="font-semibold text-sm capitalize">
      {label}
      <Input
        type={type || "text"}
        id={uniqName}
        name={name || uniqName}
        ref={ref || inpRef}
        defaultValue={val || defaultValue}
        placeholder={placeholder || ""}
        className={cn(
          "bg-pink-400 font-normal text-white placeholder:text-gray-300 focus:bg-white",
          className
        )}
        {...props}
      />
      {err?.map((e) => (
        <span key={e} className="text-red-400">
          {e}
        </span>
      ))}
    </label>
  );
}
