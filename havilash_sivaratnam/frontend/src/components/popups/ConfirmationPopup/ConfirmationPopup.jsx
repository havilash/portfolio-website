import Popup from "src/components/popups/Popup/Popup";

function ConfirmationPopup({ open, text, onConfirm, onCancel }) {
  return (
    <Popup
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
    </Popup>
  );
}

export default ConfirmationPopup;
