import { z } from "zod";
import { procedure, router } from "../utils";
export default router({
  isValidEmail: procedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      const { email } = input;
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      return emailRegex.test(email);
    }),
  validatePassword: procedure
    .input(z.object({ password: z.string() }))
    .query(async ({ input }) => {
      const { password } = input;
      let strength = 0;

      if (password.length > 8) {
        strength += 1;
      }

      const containsNumber = /\d/;
      if (containsNumber.test(password)) {
        strength += 1;
      }

      const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
      if (containsSpecialChar.test(password)) {
        strength += 1;
      }

      const containsUpperCase = /[A-Z]/;
      if (containsUpperCase.test(password)) {
        strength += 1;
      }

      const containsLowerCase = /[a-z]/;
      if (containsLowerCase.test(password)) {
        strength += 1;
      }

      return strength;
    }),
});
