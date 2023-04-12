import { ethers } from "ethers";

const validate = (type, validations, data, key) => {
  const value = data[key];
  switch (type) {
    case "required":
      const valid = value && value.length > 0;
      return { valid: valid, error: validations.error };

    case "address":
      const isAddress = ethers.utils.isAddress(value);
      return {
        valid: isAddress,
        error: validations.error,
      };

    case "notSigner" || "notArbiter" || "notBenificier":
      console.log("hehre", value, data[validations.key]);
      let isEqual = value.toLowerCase() !== data[validations.key].toLowerCase();
      return {
        valid: isEqual,
        error: validations.error,
      };

    default:
      return { valid: true, error: "" };
  }
};

export const performValidations = (fields, data) => {
  let errors = {};
  for (let key in data) {
    const fieldInfo = fields.find((item) => item.id === key);
    const validation = fieldInfo?.validations;
    if (validation) {
      for (let [type, validations] of Object.entries(validation)) {
        const { valid, error } = validate(type, validations, data, key);
        console.log("here", valid);

        if (!valid) {
          errors[key] = error;
          break;
        }
      }
    }
  }

  return errors;
};
