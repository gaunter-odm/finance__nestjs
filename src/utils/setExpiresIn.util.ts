export const setExpiresIn = (value: string): number => {
  const regex = /^(?<time>\d+)(?<multiplier>[smhd])$/;
  const multipliers = {
    s: 1000,
    m: 60000,
    h: 3.6e6,
    d: 8.64e7,
  };
  const { time, multiplier } = regex.exec(value).groups;
  return Number(time) * multipliers[multiplier] + Date.now();
};
