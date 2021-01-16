---
name: 'ui-icon'
root: 'src/components/icons'
output: '.'
questions:
  name: 'Please enter a icon name.'
---

# Variables

- name: `{{ inputs.name | pascal }}Icon`

# `{{ name }}.tsx`

```typescript
import React from 'react';

export type Props = React.ComponentProps<'svg'>;

export const {{ name }}: React.FC<Props> = ({ fill, ...rest }) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...rest}>
    {/* FIXME */}
    <circle cx={0} cy={0} r={0} fill={fill} />
  </svg>
);
```
