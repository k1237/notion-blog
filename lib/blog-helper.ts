
export const getPageLink = (tag: string, page: number) => {
  return tag ? `/blog/tag/${tag}/page/${page}` : `/blog/page/${page}`;
};
