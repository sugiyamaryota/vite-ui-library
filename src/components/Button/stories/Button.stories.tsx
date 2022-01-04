import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Meta } from '@storybook/react'

import Button from '@/components/Button'

export default {
    title: 'Components/Button',
    decorators: [
        Story => <MemoryRouter initialEntries={['/']}>{Story()}</MemoryRouter>,
    ],
} as Meta

export const Primary = () => <Button>button</Button>