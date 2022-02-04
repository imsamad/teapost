export const trimExtra = (str: string | any, length: number): boolean => {
  if (!str) return false;
  let splitted = str.split(' ');
  let filtered = splitted.filter((val: string) => val !== '');
  let joined = filtered.join(' ');
  console.log('joined ', joined);
  return joined.length >= length ? true : false;
};

export const typeOf = (
  val: any,
  type: string | 'string' | 'array' | 'object'
) => val.constructor.name.toLowerCase() === type.toLowerCase();
