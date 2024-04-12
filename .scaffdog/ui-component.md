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

export type Props = React.PropsWithChildren<{}>;

export const {{ name }} = ({ children, ...rest }: Props) => (
  <Wrapper {...rest}>{children}</Wrapper>
);
```

# `{{ name }}/{{ name }}.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { {{ name }} } from './';

type Component = typeof {{ name }};
type Story = StoryObj<Component>;

export default {
  component: {{ name }},
  args: {},
} satisfies Meta<Component>;

export const Overview: Story = {};
```
