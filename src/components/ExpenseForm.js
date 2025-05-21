import React, { useState } from 'react';

function ExpenseForm({ initialData = {}, onSubmit, onCancel }) {
  const [amount, setAmount] = useState(initialData.amount || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [date, setDate] = useState(initialData.date || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category || !date) return alert('All fields are required');
    onSubmit({ amount, category, date });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2"
          required
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2"
          required
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2"
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="text-gray-600">
          Cancel
        </button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
