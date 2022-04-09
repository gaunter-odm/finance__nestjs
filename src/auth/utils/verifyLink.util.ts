import { MagikLinkDocument } from '../../schemas/MagikLink.schema';
import { verifyExpiresIn } from '../../utils/verifyExpiresIn.util';

export const verifyLink = (link: MagikLinkDocument | null): boolean => {
  if (!link) return false;
  return verifyExpiresIn(link.expiresIn);
};
