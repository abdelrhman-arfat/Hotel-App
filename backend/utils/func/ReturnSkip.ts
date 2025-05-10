const returnSkip = (req) => {
  let { page = 1, limit = 20 } = req.query;
  page = isNaN(+page) || +page < 1 ? 1 : +page;
  limit = isNaN(+limit) || +limit < 1 ? 20 : Math.min(+limit, 100);
  const skip = (page - 1) * limit;
  return [skip, limit];
};
export default returnSkip;
