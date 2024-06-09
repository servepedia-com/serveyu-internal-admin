import React, { useEffect, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import LayerLoader from "../global/LayerLoader";

// Define the shape of the additional props the HOC will inject
interface WithAutoSizerProps {
  height: number;
  width: number;
}

function WithAutoSizer<P extends object>(
  Component: React.ComponentType<P & WithAutoSizerProps>
) {
  const WrappedComponent: React.FC<Omit<P, keyof WithAutoSizerProps>> = (
    props
  ) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);

    return (
      <>
        {!mounted ? <LayerLoader /> : null}

        <AutoSizer>
          {({ height, width }) => (
            <Component {...(props as P)} height={height} width={width} />
          )}
        </AutoSizer>
      </>
    );
  };

  WrappedComponent.displayName = `withAutoSizer(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
}

export default WithAutoSizer;
