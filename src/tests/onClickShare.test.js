import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DoneRecipes from '../pages/DoneRecipes';

describe('onClickShare function', () => {
  it('should copy link to clipboard and display "Link copied!" when share button is clicked', () => {
    const mockDoneRecipes = [
      {
        id: 1,
        type: 'meal',
        name: 'Test meal',
        image: 'test-image.jpg',
        category: 'Test category',
        alcoholicOrNot: '',
        area: 'Test area',
        doneDate: '2022-03-08',
        tags: ['test-tag'],
      },
    ];

    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockDoneRecipes));

    const { getByTestId } = render(<DoneRecipes />);

    const shareButton = getByTestId('0-horizontal-share-btn');
    fireEvent.click(shareButton);

    expect(navigator
      .clipboard.writeText).toHaveBeenCalledWith(`${window.location.origin}/meals/1`);
    expect(getByTestId('link-copied-message')).toHaveTextContent('Link copied!');
  });
});
