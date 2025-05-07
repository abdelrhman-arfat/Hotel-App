const returnSkip = (page: number, limit: number) => {
  return Number(page - 1) * Number(limit);
};
export default returnSkip;