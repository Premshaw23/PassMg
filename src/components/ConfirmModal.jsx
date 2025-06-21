import React from "react";

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <div className="mb-4 text-lg font-semibold text-gray-800">{message}</div>
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-full font-semibold"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1.5 rounded-full font-semibold"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal; 