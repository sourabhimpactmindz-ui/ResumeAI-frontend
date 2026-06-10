export const validateSignup = {
  name: {
    required: "Full name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters long",
    },
    maxLength: {
      value: 50,
      message: "Name must not exceed 50 characters",
    },
    validate: {
      noSpecialChars: (value) => {
        // Only letters allowed, no special chars, no whitespace/spaces
        if (!/^[a-zA-Z]+$/.test(value)) {
          return "Name can only contain letters (no spaces or special characters)";
        }
        return true;
      },
    },
  },

  email: {
    required: "Email address is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/,
      message: "Please enter a valid email address (no numbers after @)",
    },
    validate: {
      noNumbersAfterAt: (value) => {
        // Check that domain part (after @) has no numbers
        const [, domain] = value.split("@");
        if (domain && /\d/.test(domain.split(".")[0])) {
          return "Domain name cannot contain numbers";
        }
        return true;
      },
    },
  },

  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
    maxLength: {
      value: 32,
      message: "Password must not exceed 32 characters",
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      message: "Password must contain uppercase, lowercase, number, and special character",
    },
  },
};
export const validateLogin = {
  email: {
    required: "Email address is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/,
      message: "Please enter a valid email address (no numbers after @)",
    },
    validate: {
      noNumbersAfterAt: (value) => {
        // Check that domain part (after @) has no numbers
        const [, domain] = value.split("@");
        if (domain && /\d/.test(domain.split(".")[0])) {
          return "Domain name cannot contain numbers";
        }
        return true;
      },
    },
  },

  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
    maxLength: {
      value: 32,
      message: "Password must not exceed 32 characters",
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      message: "Password must contain uppercase, lowercase, number, and special character",
    },
  },
};