import React from "react";

function LayerLoader() {
  return (
    <div className="h-full w-full z-10 flex items-center absolute justify-center ">
      <div
        className={`h-full w-full absolute  bg-background  overflow-clip rounded-lg opacity-60 inset-0`}
      ></div>
      <div className="loader z-50 opacity-100" />
    </div>
  );
}

export default LayerLoader;
