type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteModal = ({ onConfirm, onCancel }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-3">Delete comment</h2>
        <p className="text-gray-500 mb-6">
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </p>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-400 text-white py-2 rounded"
          >
            NO, CANCEL
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white py-2 rounded"
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
