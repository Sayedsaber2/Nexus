import * as React from "react";

import {cn} from "@/lib/utils";

function Input({className, type, ...props}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-gray-500 text-sm text-white focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC]/80  w-full min-w-0 rounded-lg border border-white/10 bg-[#0A0A0F] px-4  py-2.5 transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground    disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

export {Input};
