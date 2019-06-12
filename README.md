# ⚡️rush

Primitives to create responsive popovers in web apps.

# Example

```js
import { gravity, solve, Rectangle } from 'rush';

const template = `<canvas></canvas><slot></slot>`;

class ToolTip extends HTMLElement {
  draw() {
    let selection = document.getSelection().getRangeAt(0).getBoundingClientRect();
    let position = solve({
      constraints: gravity.n,
      anchor: selection,
      popover: this.element,
      pointerSize: new Rectangle(0, 0, 5, 5)
    });

    let canvas = this.querySelector('canvas');
    canvas.width = position.width;
    canvas.height = position.height;

    let context = canvas.getContext('2d');
  }
}
```

```html
<tool-tip>Hello</tool-tip>
```

# React demo

```tsx
import * as React from 'react';
import { FC, useLayoutEffect } from 'react';
import { Constraint } from 'rush';

export const ToolTip: FC<{
  constraints: Constraint[]
}> = props => {
  let [style, setStyle] = useState({});
  let ref = useRef();

  useLayoutEffect(function () {
    let position = solve({
      constraints: props.constraints,
      anchor: selection,
      popover: ref.current,
      pointerSize: new Rectangle(0, 0, 5, 5)
    });
  }, [constraints]);

  return (
    <div ref={ref} style={position}>{children}</div>
  );
}
```
