export default function responseReject(error) {
  const {
    response: {data},
  } = error;
  return Promise.reject(data);
}
