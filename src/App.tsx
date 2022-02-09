import React from 'react';
import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'tailwindcss/tailwind.css';
import BaseFigma, {Color} from './api/baseFigma';
import {FigmaNode} from './constants/figma/common';

class PrimitivesColor extends BaseFigma {
  isColorNode(figmaNode: FigmaNode) {
    return (
      String(figmaNode.name).startsWith('_ template primitive grid') &&
      figmaNode.fills.length > 0
    );
  }
  convertNodeToColorObject(figmaNodes: Array<FigmaNode>) {
    return figmaNodes.map(
      node => new Color(node, node.children[0].children[0].characters)
    );
  }
}

class OtherColor extends BaseFigma {
  isColorNode(figmaNode: FigmaNode) {
    return (
      String(figmaNode.name).startsWith(
        'List item / Standard / 2 line / Artwork small / Simple'
      ) && figmaNode.fills.length > 0
    );
  }
  convertNodeToColorObject(figmaNodes: Array<FigmaNode>) {
    return figmaNodes.map(
      node =>
        new Color(
          node.children[node.children.length - 1].children[0],
          node.children[3].children[0].characters
        )
    );
  }
}

function App() {
  const [href, setHref] = useState(
    'https://api.figma.com/v1/files/VrbYmHc1diBWBCDzKr4b8p?ids=13603%3A121935'
  );
  const [token, setToken] = useState(
    '308588-e99e043e-c117-4377-93df-38be164a7946'
  );
  const onGetColor = () => {
    new PrimitivesColor(href, token);
    new OtherColor(href, token);
  };

  return (
    <div className="App">
      <p>
        From Figma:{' '}
        <a
          target="_blank"
          href="https://www.figma.com/file/VrbYmHc1diBWBCDzKr4b8p/%E2%9D%96-Base-Gallery-(Community)?node-id=13603%3A121935"
          rel="noreferrer"
        >
          Design
        </a>
      </p>
      <div>
        <input
          type="text"
          placeholder="href"
          value={href}
          onChange={e => setHref(e.target.value)}
        />
        <input
          type="text"
          placeholder="token"
          value={token}
          onChange={e => setToken(e.target.value)}
        />
      </div>
      <button onClick={onGetColor}>Get Color</button>
      <p>Click the button and wait for a few seconds</p>
    </div>
  );
}

export default App;
