const catchHandler = (err, code) => {
  const error = err as Error;
  console.error("catch handler error : \n", error.message);
  return {
    code,
    message: error.message || "Internal server error",
    data: null,
    success: false,
  };
};

export default catchHandler;
