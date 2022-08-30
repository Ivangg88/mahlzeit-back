import bcryptjs from "bcryptjs";

const hashCreator = (textToEncrypt: string): Promise<string> => {
  const salt = 10;
  return bcryptjs.hash(textToEncrypt, salt);
};

export default hashCreator;
