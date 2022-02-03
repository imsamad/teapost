const trimExtra = (str: string | any, length: number): boolean => {
  if (!str) return false;
  let splitted = str.split(' ');
  let filtered = splitted.filter((val: string) => val !== '');
  let joined = filtered.join(' ');
  return joined.length > length ? true : false;
};
export default trimExtra;
