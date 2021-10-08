import { rgxPassword } from './password';
import { rgxId } from './ID';
import { rgxPath } from './path';
import { rgxEmail } from './email';

export { rgxId, rgxPath };

export function validateEmail(e: string): boolean {
    return rgxEmail.test(e);
}
export function validatePassword(e: string): boolean {
    return rgxPassword.test(e);
}
