declare module "react-player" {
  import * as React from "react";

  interface ReactPlayerProps {
    url: string | string[] | MediaStream | undefined;
    playing?: boolean;
    loop?: boolean;
    controls?: boolean;
    volume?: number;
    muted?: boolean;
    width?: string | number;
    height?: string | number;
    [key: string]: unknown; // Permite outras props que não estão explicitamente declaradas
  }

  class ReactPlayer extends React.Component<ReactPlayerProps> {}

  export default ReactPlayer;
}
