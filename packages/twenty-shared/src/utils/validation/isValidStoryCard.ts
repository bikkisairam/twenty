export type StoryCard = {
  id: string;
  description: string;
  acceptanceCriteria: string[];
};

export const isValidStoryCard = (storyCard: StoryCard): boolean => {
  // Check if description exists and is not just whitespace
  const hasValidDescription =
    storyCard.description && storyCard.description.trim().length > 0;

  // Check if there's at least one non-empty acceptance criterion
  const hasValidAcceptanceCriteria =
    storyCard.acceptanceCriteria.length > 0 &&
    storyCard.acceptanceCriteria.some((criterion) => criterion.trim().length > 0);

  return hasValidDescription && hasValidAcceptanceCriteria;
};
