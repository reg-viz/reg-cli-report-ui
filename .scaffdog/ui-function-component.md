---
name: 'ui-function-component'
description: 'Create Function Component'
message: 'Please enter component name.'
root: 'src/components'
output: '**/*'
ignore: ['**/{A..Z}*', '**/__tests__']
---

# `{{ input | pascal }}/index.ts`

```typescript
{{ read "./partials/index.tpl" }}
```

# `{{ input | pascal }}/{{ input | pascal }}.tsx`

```typescript
import React from 'react';
import styled from 'styled-components';
import { Space } from '{{ relative "../src/styles/variables" }}';

const Wrapper = styled.div`
  margin: ${Space}px;
`;

export type Props = {
};

export const {{ input | pascal }}: React.FC<Props> = ({ children, ...rest }) => (
  <Wrapper {...rest}>{children}</Wrapper>
);
```

# `{{ input | pascal }}/{{ input | pascal }}.stories.tsx`

```typescript
{{ read "./partials/stories.tpl" }}
```
