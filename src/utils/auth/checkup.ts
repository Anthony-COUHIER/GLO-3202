export function isValidEmail(email: string): boolean {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

export function getPasswordStrength(password: string) {
  const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  let point = 0;

  if (password.length >= 8) {
    point++;
  } else {
    throw new Error("Password must be at least 8 characters long", {
      cause: "password",
    });
  }

  // Check if password contains special characters
  if (specialChars.test(password)) {
    point++;
  } else {
    throw new Error("Password must contain special characters", {
      cause: "password",
    });
  }

  // Check if password contains both lower and uppercase characters
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    point++;
  } else {
    throw new Error(
      "Password must contain both lower and uppercase characters",
      {
        cause: "password",
      }
    );
  }

  // Check if password contains at least one number
  if (/\d/.test(password)) {
    point++;
  } else {
    throw new Error("Password must contain at least one number", {
      cause: "password",
    });
  }

  return point;
}
