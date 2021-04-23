export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type RoundedRectanglePath = {
  x: number;
  y: number;
  width: number;
  height: number;
  rounded: number;
};

export type OptionsSchema = {
  assetName: string;

  canvas: {
    size: {
      width: number;
      height: number;
    };
  };

  output: {
    size: {
      width: number;
      height: number;
    };
  };

  background: RoundedRectanglePath & {
    fillStyle: string;
  };

  icon: {
    x: number;
    y: number;
    svgPath: string;
    fillStyle: string;
    scale: number;
  };
};
