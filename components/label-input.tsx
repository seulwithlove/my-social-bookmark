import {
  type ComponentProps,
  type HTMLElementType,
  type RefObject,
  useId,
} from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

type Props = {
  label: string;
  type?: string;
  id?: string;
  name?: string;
  ref?: RefObject<HTMLElementType | null>;
  placeholder?: string;
  className?: string;
};

export default function LabelInput({
  label,
  type,
  id,
  name,
  ref,
  placeholder,
  className,
  ...props
}: Props & ComponentProps<"input">) {
  const uniqName = useId();
  return (
    <label htmlFor={uniqName} className="font-semibold text-sm capitalize">
      {label}
      <Input
        type={type || "text"}
        id={uniqName}
        name={name || uniqName}
        ref={ref}
        placeholder={placeholder || ""}
        className={cn(
          "bg-pink-400 font-normal text-white placeholder:text-gray-300 focus:bg-white",
          className
        )}
        {...props}
      />
    </label>
  );
}
