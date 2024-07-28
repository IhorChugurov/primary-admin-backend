export interface RefreshTokenData {
  /**
   * The "subject" of the token. The value of this property is the user ID
   * that granted this token.
   */
  sub: string;

  /**
   * ID of the refresh token in the DB.
   */
  refreshTokenId: string;
}
