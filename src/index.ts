import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';

import { join } from 'node:path';

const { USERDOMAIN, HOME } = process.env;
const origin = join((USERDOMAIN || HOME) as string, 'Downloads');
const destination = join(origin, 'converted');
async function main() {
  await mkdir(destination, { recursive: true });
  const files = await readdir(origin);
  files.forEach(async (file) => {
    if (file.match(/\.png$|\.jpg$|\.jpeg$|\.bmp$/)) {
      const fn = file.toLowerCase().replace(/_| /g, '-');
      console.log(`converting ${fn} to png...`);
      const img = sharp(join(origin, file));
      img.toFormat('png');
      await img.toFile(
        join(destination, fn.replace(/\.png$|\.jpg$|\.jpeg$|\.bmp$/, '.png'))
      );
      return;
    }
  });
}

main();
