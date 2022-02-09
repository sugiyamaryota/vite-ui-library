export type FigmaNode = {
  id: string;
  name: string;
  type: string;
  blendMode: string;
  children: Array<FigmaNode>;
  characters: string;
  absoluteBoundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  constraints: {
    vertical: string;
    horizontal: string;
  };
  clipsContent: boolean;
  background: Array<{
    blendMode: string;
    type: string;
    color: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
  }>;
  fills: [
    {
      blendMode: string;
      type: string;
      color: {
        r: number;
        g: number;
        b: number;
        a: number;
      };
      opacity: number;
    }
  ];
  strokes: Array<any>;
  strokeWeight: number;
  strokeAlign: string;
  backgroundColor: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  styles: {
    fills: string;
  };
  effects: Array<any>;
};
