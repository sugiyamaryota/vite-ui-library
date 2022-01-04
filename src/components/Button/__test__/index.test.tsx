/**
 * @jest-environment jsdom
 */
 import { render, screen } from '@testing-library/react'
 import { composeStories } from '@storybook/testing-react'
 import * as stories from '../stories/Button.stories' // import all stories from the stories file
 const {Primary} = composeStories(stories)

 test('renders primary button', () => {
    // Arrange
    render(<Primary />)
    // Act
    const buttonElement = screen.queryByText(/button/i)
    // Assert
    expect(buttonElement).not.toBeNull()
  })
