# ⚡️rush

Primitives to create responsive popovers in web apps.

# React example

```tsx
import * as React from 'react';
import { FC, useLayoutEffect } from 'react';
import { Constraint, solveFor } from 'rush';

export const ToolTip: FC<{
  constraints: Constraint[],
  for: 
}> = props => {
  let [style, setStyle] = useState({});
  let [rect, setRect] = useState<DOMRect | null>(null);
  let ref = useRef();

  useEffect(() => {
    let change = () => {
      let selection = document.getSelection();
      if (selection) {
        setRect(selection.getRangeAt(0).getBoundingClientRect());
      }
    };
    document.addEventListener('selectionchange', change);
  
    return () => {
      document.removeEventListener('selectionchange', change);
    };
  }, []);

  useLayoutEffect(function () {
    let position = solveFor(
      props.constraints,
      ref.current,
      anchor: selection
    });
  }, [constraints]);

  return (
    <div ref={ref} style={position}>{children}</div>
  );
}
```
