"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useReducer, useState } from "react";

export default function ThemeChanger() {
  const [isDarkmode, toggleTheme] = useReducer((pre) => !pre, false);

  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return <button></button>;
  return (
    <div>
      <Link href="/bookcase" className="btn-icon">
        <button onClick={toggleTheme} className="btn-icon">
          {isDarkmode ? <SunIcon /> : <MoonIcon />}
        </button>
      </Link>
    </div>
  );
}
