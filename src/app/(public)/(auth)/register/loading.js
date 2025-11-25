import React from "react";
import { Loader } from "lucide-react";

function loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex">
        <Loader className="animate-spin mr-2" /> Loading...
      </div>
    </div>
  );
}

export default loading;
