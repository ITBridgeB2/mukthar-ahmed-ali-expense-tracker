import React from 'react';
import axios from 'axios';

function ConfirmDeleteModal({ id, onCancel, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      onDelete();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
   
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
  <div className="bg-white text-ocean-dark w-[90%] max-w-md p-6 rounded-xl shadow-2xl">
    <p className="mb-4">Are you sure you want to delete this expense?</p>
        <div className="flex justify-center space-x-4">
          <button onClick={onCancel} className="px-4 py-2 border">No</button>
          <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
  </div>
</div>

        
   
  );
}

export default ConfirmDeleteModal;
