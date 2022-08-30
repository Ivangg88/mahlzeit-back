interface ICustomError extends Error {
  statusCode: number;
  publicMessage?: string;
  privateMessage?: string;
}
export default ICustomError;
