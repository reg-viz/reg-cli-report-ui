---
name: 'ui-component'
root: 'src/components'
output: '**/*'
ignore:
  - 'src/components/icons'
  - '**/{A..Z}*'
  - '**/__tests__'
questions:
  name: 'Please enter a component name.'
---

# Variables

- name: `{{ inputs.name | pascal }}`

# `{{ name }}/index.ts`

```typescript
export * from './{{ name }}';
```

# `{{ name }}/{{ name }}.tsx`

```typescript
import React from 'react';
import styled from 'styled-components';
import { Space } from '{{ relative "../src/styles/variables" }}';

const Wrapper = styled.div`
  margin: ${Space}px;
`;

export type Props = {};

export const {{ name }}: React.FC<Props> = ({ children, ...rest }) => (
  <Wrapper {...rest}>{children}</Wrapper>
);
```

# `{{ name }}/{{ name }}.stories.tsx`

```typescript
import { storiesOf } from '@storybook/react';
import React from 'react';
import { withPadding } from '{{ relative "../src/styles/storybook-decorators" }}';
import { {{ name }} } from './';

storiesOf('{{ name }}', module)
  .addDecorator(withPadding())
  .add('overview', () => (
    <{{ name }}>TODO</{{ name }}>
  ));
```
