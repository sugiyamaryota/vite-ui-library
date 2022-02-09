import {FigmaNode} from '@/constants/figma/common';

function download(filename: string, text: string) {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export class Color {
  data: FigmaNode;
  name: string;
  rgba: any;

  constructor(data: FigmaNode, name: string) {
    this.data = data;
    this.name = name || data.name.replace(/\s+/g, '-').toLowerCase();
    if (data.fills && data.fills[0] && data.fills[0].type === 'SOLID') {
      this.rgba = {
        r: this.rgbToInt(data.fills[0].color.r),
        g: this.rgbToInt(data.fills[0].color.g),
        b: this.rgbToInt(data.fills[0].color.b),
        a: data.fills[0].opacity
      };
    }
  }

  get hex() {
    return this.rgbToHex(this.rgba.r, this.rgba.g, this.rgba.b);
  }

  get cssColor() {
    if (this.rgba && this.rgba.a < 1) {
      return `rgba(${this.hex}, ${this.rgba.a.toFixed(2)})`;
    } else {
      return this.hex;
    }
  }

  get cssVariables() {
    return `$${this.name}: ${this.cssColor}`;
  }

  rgbToInt(value: number) {
    return Math.ceil(value * 255);
  }

  intToHex(int: number | string) {
    let hex = Number(int).toString(16);
    if (hex.length < 2) {
      hex = '0' + hex;
    }
    return hex;
  }

  rgbToHex(r: number | string, g: number | string, b: number | string) {
    const red = this.intToHex(r);
    const green = this.intToHex(g);
    const blue = this.intToHex(b);
    return '#' + red + green + blue;
  }
}

/**
 * Following steps to implement get colors in figma
 * @Step 1: Implementing logic for isColorNode function which recoginize the color node
 * @Step 2: Implementing logic for convertNodeToColorObject function which convert figma nodes to color object, then from color object to content
 */
export default abstract class BaseFigma {
  abstract isColorNode(node: FigmaNode): boolean;
  abstract convertNodeToColorObject(nodes: Array<FigmaNode>): Array<Color>;
  colors: Array<Color> = [];
  loading = false;

  constructor(url: string, token: string) {
    this.loading = true;
    this.getNodes(url, token)
      .then(nodes => nodes.filter(this.isColorNode))
      .then(nodes => (this.colors = this.convertNodeToColorObject(nodes)))
      .then(() => {
        this.download();
        this.loading = false;
      });
  }

  download() {
    const content = this.colors
      .map(c => `const ${c.name} = '${c.hex}';`)
      .join('\n');

    download('color.js', content);
  }

  /**
   *
   * @param {*} url : API url to get figma document
   * @param {*} token : figma token
   */
  private getNodes(url: string, token: string): Promise<Array<FigmaNode>> {
    return new Promise((res, rej) => {
      const forEachNode = (
        data: FigmaNode,
        onEachNode: (node: FigmaNode) => void
      ) => {
        onEachNode(data);
        if (data.children) {
          data.children.forEach(node => forEachNode(node, onEachNode));
        }
      };

      const options = {
        headers: {'X-Figma-Token': token}
      };
      fetch(url, options).then(resp => {
        resp.json().then(body => {
          const nodes: Array<FigmaNode> = [];
          forEachNode(body.document, node => {
            nodes.push(node);
          });
          res(nodes);
        });
      });
    });
  }
}
