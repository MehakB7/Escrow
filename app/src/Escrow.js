import { ethers } from "ethers";
import { approve } from "./App";
import { abi } from "./constant";

export default function Escrow({
  address,
  arbiter,
  beneficiary,
  value,
  signer,
  approved,
}) {
  const handleApprove = async () => {
    const escrowContract = new ethers.Contract(address, abi, signer);

    escrowContract.on("Approved", () => {
      console.log("inside this approved", escrowContract.address);
      document.getElementById(escrowContract.address).className = "complete";
      document.getElementById(escrowContract.address).innerText =
        "✓ It's been approved!";
      const contacts = JSON.parse(localStorage.getItem("contracts"));
      const updatedItem = contacts.find(
        (item) => item.address === escrowContract.address
      );
      updatedItem.approved = true;
      localStorage.setItem("contracts", JSON.stringify(contacts));
    });

    await approve(escrowContract, signer);
  };

  const getStatusComponet = () => {
    return (
      <>
        {approved ? (
          <div className="complete" id={address}>
            ✓ It's been approved!
          </div>
        ) : (
          <div
            className="button"
            id={address}
            onClick={(e) => {
              e.preventDefault();
              handleApprove();
            }}
          >
            Approve
          </div>
        )}
      </>
    );
  };

  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {value} </div>
        </li>
        {getStatusComponet()}
      </ul>
    </div>
  );
}
