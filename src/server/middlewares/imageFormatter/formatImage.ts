import sharp from "sharp";

const processFile = async (
  file: Buffer,
  fileName: string
): Promise<{ buffer: Buffer; fileName: string }> => {
  try {
    const newImageFile = await sharp(file)
      .resize({ width: 500 })
      .toFormat("webp")
      .toBuffer();
    const baseName =
      fileName.substring(0, fileName.lastIndexOf(".")) || fileName; // Nombre sin la extensión
    const newFileName = `${baseName}.webp`;

    return { buffer: newImageFile, fileName: newFileName };
  } catch (error) {
    return { buffer: file, fileName };
  }
};

export default processFile;
