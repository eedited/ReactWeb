import { rgxId } from './ID';
import { rgxPath } from './path';
import { rgxEmail } from './email';

export { rgxId, rgxPath };

export function validateEmail(e: string): boolean {
    return rgxEmail.test(e);
}
