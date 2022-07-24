const errorsMessage = {
  '401': '$entity is missing/not valid - Unauthorized',
};

export default function errorUtils(status: number, message: string) {
  let type = 'Unknown';

  if (status >= 500) {
    type = 'Internal server error';
  } else if (status >= 400) {
    type = 'Bad request';
  } else if (status >= 300) {
    type = 'Redirect';
  }

  if (errorsMessage[status] !== undefined) {
    message = errorsMessage[status].replace('$entity', message);
  }

  return { type, status, message };
}
