import AppError from "../../../utilities/appError.js";
import * as tfaHelper from "../../../utilities/tfaHelper.js";
import { getUserByIdOrFail } from "../../../utilities/dataHelper.js";

export const enableTFAService = async (userId, TFACode, method) => {
  const user = await getUserByIdOrFail(userId);

  if (method === "backup")
    throw new AppError(`This action cant be done using backup code`, 401);

  if (user.TFA[method].status === false)
    throw new AppError(`${method} 2FA is not verified`, 401);

  if (user.TFA.status === true && user.TFA.method === method)
    throw new AppError(`${method} 2FA already enabled`, 401);

  await tfaHelper.verifyTFACode(user, TFACode, method);

  const backupCodes = await tfaHelper.generateHashSaveBackupCodes(user);

  user.TFA.status = true;
  user.TFA.method = method;
  await user.save();

  return { backupCodes };
};

export const disableTFAService = async (userId, TFACode, method) => {
  const user = await getUserByIdOrFail(userId);

  if (user.TFA.status === false)
    throw new AppError(`2FA already disabled`, 401);

  if (method !== "backup" && user.TFA.method !== method)
    throw new AppError(`${method} 2FA is not in use`, 401);

  await tfaHelper.verifyTFACode(user, TFACode, method);

  tfaHelper.disableTFA(user);
  await user.save();

  return { method };
};

export const getCurrentTFAStatusService = async (userId) => {
  const user = await getUserByIdOrFail(userId);
  const { status, method } = user.TFA;

  return { status, method };
};

export const regenerateBackupCodesService = async (userId, TFACode, method) => {
  const user = await getUserByIdOrFail(userId);

  if (user.TFA.status === false) throw new AppError("2FA is not enabled", 401);

  if (method !== "backup" && user.TFA.method !== method)
    throw new AppError(`${method} 2FA is not in use`, 401);

  await tfaHelper.verifyTFACode(user, TFACode, method);

  const backupCodes = await tfaHelper.generateHashSaveBackupCodes(user);
  await user.save();

  return { backupCodes };
};
