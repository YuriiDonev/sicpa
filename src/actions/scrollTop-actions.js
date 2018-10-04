
export const scrollToTop = () => ({
  type: 'SCROLL_TO_TOP',
  payload: true,
});

export const scrollToTopRemove = () => ({
  type: 'NOT_SCROLL_TO_TOP',
  payload: false,
});
