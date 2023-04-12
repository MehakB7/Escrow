import React, { useState } from "react";
import { contractFields } from "./constant";
import FormFiled from "../FormFields/FormFiled";
import { ethers } from "ethers";
import deploy from "../../deploy";
import { performValidations } from "../../helper/utils";

const initialState = { bAddress: "", aAddress: "", amount: "" };

const Contract = ({ signer, setEscrows, sender }) => {
  const [details, setDetails] = useState(initialState);

  const [errors, setErros] = useState({});

  const onChange = (name, value) => {
    if (errors[name]) {
      delete errors[name];
      setErros(errors);
    }
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  async function newContract() {
    const beneficiary = details.bAddress;
    const arbiter = details.aAddress;
    const value = ethers.utils.parseEther(details.amount, "ether");

    const escrowContract = await deploy(signer, arbiter, beneficiary, value);
    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value: details.amount,
    };

    setEscrows((prev) => {
      let newContracts = [escrow, ...prev];
      localStorage.setItem("contracts", JSON.stringify(newContracts));
      return newContracts;
    });
    setDetails(initialState);
  }

  const createContract = () => {
    const errors = performValidations(contractFields, {
      ...details,
      sender: sender,
    });
    setErros(errors);
    Object.keys(errors).length === 0 && newContract();
  };

  return (
    <div className="contract">
      <h2>Create New Contract</h2>
      <div className="contract_body">
        {contractFields.map((item, index) => (
          <FormFiled
            key={index}
            {...item}
            onChange={onChange}
            value={details[item.id]}
            error={errors[item.id] || ""}
          />
        ))}
        <button
          className="button"
          id="deploy"
          onClick={(e) => {
            e.preventDefault();
            createContract();
          }}
          disabled={Object.keys(errors).length > 0}
        >
          Deploy
        </button>
      </div>
    </div>
  );
};

export default Contract;
