import React from "react";

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-grey-800 text-xl font-bold mb-4">Delete comment</h3>
        <p className="text-grey-500 mb-6">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer"
          >
            NO, CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-800 transition-colors cursor-pointer"
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

// type Props = {
//   onConfirm: () => void;
//   onCancel: () => void;
// };

// const DeleteModal = ({ onConfirm, onCancel }: Props) => {
//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg max-w-sm w-full">
//         <h2 className="text-lg font-bold mb-3">Delete comment</h2>
//         <p className="text-gray-500 mb-6">
//           Are you sure you want to delete this comment? This will remove the
//           comment and can’t be undone.
//         </p>

//         <div className="flex gap-4">
//           <button
//             onClick={onCancel}
//             className="flex-1 bg-gray-400 text-white py-2 rounded"
//           >
//             NO, CANCEL
//           </button>

//           <button
//             onClick={onConfirm}
//             className="flex-1 bg-red-500 text-white py-2 rounded"
//           >
//             YES, DELETE
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteModal;
