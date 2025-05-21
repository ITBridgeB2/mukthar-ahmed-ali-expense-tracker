import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseEditForm = ({ expense, onCancel, onUpdate }) => {
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);
  const [date, setDate] = useState(expense.date);
  const [description, setDescription] = useState(expense.description);

  // Handle form submission (update expense)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedExpense = {
      amount,
      category,
      date,
      description,
    };

    try {
      await axios.put(`http://localhost:5000/api/expenses/${expense.id}`, updatedExpense);
      onUpdate(updatedExpense); // Update the UI after successful update
    } catch (error) {
      console.error('Error updating expense:', error);
      alert('Error updating expense!');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Edit Expense</h2>
      <div style={styles.inputGroup}>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.inputGroup}>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.inputGroup}>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.inputGroup}>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.formButtons}>
        <button type="button" onClick={onCancel} style={styles.cancelButton}>
          Cancel
        </button>
        <button type="submit" style={styles.saveButton}>
          Save Changes
        </button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  formButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#ccc',
    color: '#fff',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#39a2db',
    color: '#fff',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default ExpenseEditForm;
