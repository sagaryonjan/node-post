import jwbt from 'jsonwebtoken';
import config from '../config';

/**
 * Generate access token from given data
 *
 * @param {LoggedInUser} data
 * @returns {string}
 */
export function generateAccessToken(data: any): string {
  return jwbt.sign({ data }, config.auth.accessTokenSecret, {
    expiresIn: '1d'
  });
}

/**
 * Generate refresh token from given data
 *
 * @param {JWTPayload} data
 * @returns {string}
 */
export function generateRefreshToken(data: any): string {
  return jwbt.sign({ data }, config.auth.refreshTokenSecret, {
    expiresIn: '1d'
  });
}



/**
 * Verify access token.
 *
 * @param {string} token
 * @returns {any | string}
 */
export function verifyAccessToken(token: string): any | string {
  return jwbt.verify(token, config.auth.accessTokenSecret);
}

/**
 * Verify refresh token.
 *
 * @param {string} token
 * @returns {any | string}
 */
export function verifyRefreshToken(token: string): any | string {
  return jwbt.verify(token, config.auth.refreshTokenSecret);
}
