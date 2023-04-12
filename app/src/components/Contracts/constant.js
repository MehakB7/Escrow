export const contractFields = [
  {
    name: "ARBITER ADDRESS",
    id: "aAddress",
    ui: "input",
    type: "text",
    validations: {
      required: { error: "Arbiter address is required " },
      address: { error: "not valid address" },
      notSigner: { key: "sender", error: "Arbiter and Signer can't be same" },
      notBenificier: {
        key: "sender",
        error: "Arbiter and Beneficiar can't be same",
      },
    },
  },
  {
    name: "BENEFICIARY ADDRESS",
    id: "bAddress",
    ui: "input",
    type: "text",
    validations: {
      required: { error: "Beneficiary address is required " },
      address: { error: "not valid address" },
      notArbiter: {
        key: "sender",
        error: "Beneficiar and signer can't be same",
      },
      notSigner: {
        key: "sender",
        error: "Beneficiar and Signer can't be same",
      },
    },
  },
  {
    name: "DEPOSIT AMOUNT (IN ETH)",
    id: "amount",
    ui: "input",
    type: "number",
    validations: {
      required: { error: "Amount is required " },
    },
  },
];
