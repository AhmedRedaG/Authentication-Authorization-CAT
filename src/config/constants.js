export const constants = {
  tfa: {
    TFA_DURATION: 1000 * 60 * 5,
    SMS_DURATION: 1000 * 60 * 15,
    LOCK_DURATION: 1000 * 60 * 15,
    MAX_ATTEMPTS: 5,
    BACKUP_CODE_COUNT: 10,
  },

  jwt: {
    ACCESS_TOKEN_AGE: "15m",
    REFRESH_TOKEN_AGE: "7d",
    REFRESH_TOKEN_AGE_COOKIE: 7 * 24 * 60 * 60 * 1000, // = 7d
    RESET_TOKEN_AGE: "1h",
    TEMP_TOKEN_AGE: "10m",
  },

  bcrypt: {
    HASH_PASSWORD_ROUNDS: 12,
    HASH_BACKUP_CODES_ROUNDS: 10,
  },
};
