"use client";

import { Loader } from "lucide-react";
import React from "react";

function LoadingScreen({ message }) {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-accent-foreground/50 fixed inset-0 z-50">
      <div className="flex text-black">
        <Loader className="animate-spin mr-2" /> {message ?? "Loading..."}
      </div>
    </div>
  );
}

export default LoadingScreen;
