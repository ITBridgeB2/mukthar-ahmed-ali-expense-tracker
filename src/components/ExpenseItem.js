import React, { useState } from 'react';
import ExpenseDetailModal from './ExpenseDetailModal';

function ExpenseItem({ expense, onRefresh }) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowDetail(true)}
        className="bg-white text-ocean-dark p-4 rounded-xl shadow-md cursor-pointer hover:scale-[1.02] transition"
      >
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg">${expense.amount}</span>
          <span className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</span>
        </div>
      </div>

      {showDetail && (
        <ExpenseDetailModal
          id={expense.id}
          onClose={() => setShowDetail(false)}
          onUpdated={onRefresh}
          onDeleted={onRefresh}
        />
      )}
    </>
  );
}

export default ExpenseItem;
