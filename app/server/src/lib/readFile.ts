import path from 'path';

const fs = require('fs');

const read = (pathStr: string) =>
  fs.readFile(
    path.join(__dirname, '../', pathStr),
    'utf8',
    (err: any, data: any) => {
      if (err) {
        console.log('err from ', pathStr);
        console.error(err);
        return;
      }
      console.log('read ', pathStr);
      console.log(data);
    }
  );

export const readProd = () => read('.env');
export const readDev = () => read('.env.development');
