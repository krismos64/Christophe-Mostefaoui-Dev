import { useState, useEffect } from "react";
import { FormData } from "../types/common";

interface ValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  consent?: string;
}

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | undefined;
}

type ValidationSchema = {
  [K in keyof FormData]?: ValidationRules;
};

export const useFormValidation = (schema: ValidationSchema) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = (name: keyof FormData, value: any): string | undefined => {
    const rules = schema[name];
    if (!rules) return undefined;

    // Required validation
    if (rules.required && (!value || (typeof value === "string" && !value.trim()))) {
      return "Ce champ est requis";
    }

    // Skip other validations if field is empty and not required
    if (!value || (typeof value === "string" && !value.trim())) {
      return undefined;
    }

    // String validations
    if (typeof value === "string") {
      // Min length validation
      if (rules.minLength && value.length < rules.minLength) {
        return `Minimum ${rules.minLength} caractères requis`;
      }

      // Max length validation
      if (rules.maxLength && value.length > rules.maxLength) {
        return `Maximum ${rules.maxLength} caractères autorisés`;
      }

      // Pattern validation
      if (rules.pattern && !rules.pattern.test(value)) {
        if (name === "email") {
          return "Format d'email invalide";
        }
        return "Format invalide";
      }
    }

    // Custom validation
    if (rules.custom) {
      return rules.custom(value);
    }

    return undefined;
  };

  const validateForm = (formData: FormData): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    Object.keys(schema).forEach((key) => {
      const field = key as keyof FormData;
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    return newErrors;
  };

  const validateSingleField = (name: keyof FormData, value: any): string | undefined => {
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    return error;
  };

  const markFieldAsTouched = (name: keyof FormData) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const isFieldValid = (name: keyof FormData): boolean => {
    return !errors[name];
  };

  const isFormValid = (formData: FormData): boolean => {
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const clearErrors = () => {
    setErrors({});
    setTouched({});
  };

  return {
    errors,
    touched,
    validateSingleField,
    validateForm,
    isFieldValid,
    isFormValid,
    markFieldAsTouched,
    clearErrors
  };
};