import Modal from "src/components/modals/Modal/Modal";

function ConfirmationModal({ open, text, onConfirm, onCancel }) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      className="flex flex-col gap-6 max-w-xl"
    >
      <p>{text}</p>
      <div className="flex flex-row justify-between items-center w-full">
        <button className="button rounded-md px-3 py-1" onClick={onConfirm}>
          Yes
        </button>
        <button className="button rounded-md px-3 py-1" onClick={onCancel}>
          No
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
