import { isValidStoryCard } from '@/utils/validation/isValidStoryCard';

describe('isValidStoryCard', () => {
  it('returns false if story card has no description', () => {
    const storyCard = {
      id: 'ENG-3',
      description: '',
      acceptanceCriteria: ['Ticket ENG-3 has a description added by the product owner'],
    };
    expect(isValidStoryCard(storyCard)).toBe(false);
  });

  it('returns false if story card has no acceptance criteria', () => {
    const storyCard = {
      id: 'ENG-3',
      description: 'Placeholder ticket with no requirements',
      acceptanceCriteria: [],
    };
    expect(isValidStoryCard(storyCard)).toBe(false);
  });

  it('returns true if story card has both description and acceptance criteria', () => {
    const storyCard = {
      id: 'ENG-1',
      description: 'Implement user authentication',
      acceptanceCriteria: [
        'User can log in with email and password',
        'User can log out',
      ],
    };
    expect(isValidStoryCard(storyCard)).toBe(true);
  });

  it('returns false if description is only whitespace', () => {
    const storyCard = {
      id: 'ENG-3',
      description: '   ',
      acceptanceCriteria: ['Some criterion'],
    };
    expect(isValidStoryCard(storyCard)).toBe(false);
  });

  it('returns false if acceptance criteria contains only empty strings', () => {
    const storyCard = {
      id: 'ENG-3',
      description: 'Some description',
      acceptanceCriteria: ['', '  '],
    };
    expect(isValidStoryCard(storyCard)).toBe(false);
  });
});
