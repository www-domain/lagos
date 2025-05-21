import { useMemo } from "react";

export default function usePasswordValidation(password:string , confirmPassword:string) {
    return useMemo(() => {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
      const hasMinLength = password.length >= 8;
      const passwordsMatch = password === confirmPassword && password !== '';
  
      return [
        { text: 'Include an uppercase letter', met: hasUpperCase },
        { text: 'Include a lowercase letter', met: hasLowerCase },
        { text: 'Include a special character', met: hasSpecialChar },
        { text: 'Must be at least 8 characters', met: hasMinLength },
        { text: 'Passwords must match', met: passwordsMatch },
      ];
    }, [password, confirmPassword]);
  }