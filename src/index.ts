import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';

const { downloads } = process.env;
const origin = downloads as string;
const destination = `${downloads}\\converted`;
async function main() {
  console.log(process.env);
  return;
  await mkdir(destination, { recursive: true });
  const files = await readdir(origin);
  files.forEach(async (file) => {
    if (file.match(/\.png$|\.jpg$|\.jpeg$|\.bmp$/)) {
      console.log(`converting ${file} to jpeg...`);
      await sharp(file)
        .toFormat('jpeg', { quality: 60 })
        .toFile(
          `${destination}\\${file.replace(
            /\.png$|\.jpg$|\.jpeg$|\.bmp$/,
            '.jpeg'
          )}`
        );
    }
  });
}

main();
