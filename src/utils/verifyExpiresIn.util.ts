export const verifyExpiresIn = (time: number): boolean => {
  const currentTime = Date.now();
  return time - currentTime > 0;
};
