const createCounter = () => {
  let counter = 0;
  return () => counter++;
};

export default createCounter;
