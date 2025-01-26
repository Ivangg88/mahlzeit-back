import "../loadEnvironment";

const backupConectionData = {
  url: process.env.SUPABASE_URL,
  key: process.env.SUPABASE_KEY,
  imageBucketName: process.env.IMAGE_BUCKET_NAME,
};

export default backupConectionData;
