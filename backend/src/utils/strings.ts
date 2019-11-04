const CODE_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Generates a random alpha-numeric code with the given length.
 */
export function generateCode(length: number) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += CODE_CHARSET.charAt(Math.floor(Math.random() * CODE_CHARSET.length));
  }
  return result;
}

/**
 * Converts the given string to camel case.
 */
export function toCamelCase(snakeCase: string): string {
  const tokens = snakeCase.split(/_+/).filter((token) => token.length >= 1);

  if (tokens.length <= 1) {
    return snakeCase;
  }

  const first = tokens.shift()!.toLowerCase();
  const rest = tokens.map((token) => {
    return token.charAt(0).toUpperCase().concat(
      token.substring(1).toLowerCase()
    );
  }).join('');

  return first.concat(rest);
}
