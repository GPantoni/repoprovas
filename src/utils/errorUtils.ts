const errors = {
  '401': '$entity is not valid',
};

export function errorUtils(message: string, status: number) {
  let type = 'Unknown';

  if (status >= 500) {
    type = 'Internal server error';
  } else if (status >= 400) {
    type = 'Bad request';
  } else if (status >= 300) {
    type = 'Redirect';
  }

  if (errors[status] !== undefined) {
    message = errors[status].replace('$entity', message);
  }

  return { type, status, message };
}
