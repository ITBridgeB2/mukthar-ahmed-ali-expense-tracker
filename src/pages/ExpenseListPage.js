import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExpenseListPage() {
  const [expenses, setExpenses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
    const [editingExpense, setEditingExpense] = useState(null);
  

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/expenses');
      setExpenses(res.data);
    } catch (err) {
      console.error('Error fetching expenses', err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/expenses', data);
      fetchExpenses();
      setShowAdd(false);
    } catch (err) {
      console.error('Add failed', err);
    }
  };
    const handleUpdateExpense = async (data) => {
    try {
      await axios.put(`http://localhost:5000/api/expenses/${editingExpense.id}`, data);
      fetchExpenses();
      setEditingExpense(null);
      setShowDetail(null);
    } catch (err) {
      console.error('Update failed', err);
    }
  };
  

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      fetchExpenses();
      setShowDetail(null);
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

   return (
    <div style={styles.pageContainer}>
      <div style={styles.expenseContainer}>
        <h1 style={styles.title}> My Expenses</h1>

        <div style={styles.addButtonContainer}>
          <button style={styles.addButton} onClick={() => setShowAdd(true)}>
            ➕ Add Expense
          </button>
        </div>

        <div style={styles.expenseItemsContainer}>
          {expenses.length === 0 ? (
            <p style={styles.noExpenses}>No expenses yet.</p>
          ) : (
            expenses.map((expense) => (
              <div
                key={expense.id}
                style={styles.expenseItem}
                onClick={() => setShowDetail(expense)}
              >
                <div style={styles.expenseItemContent}>
                  <span style={styles.amount}>₹{expense.amount}</span>
                  <span style={styles.date}>
                    {new Date(expense.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAdd && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <h2 style={styles.modalTitle}>Add Expense</h2>
            <ExpenseForm
              onSubmit={handleAddExpense}
              onCancel={() => setShowAdd(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Expense Modal */}
      {editingExpense && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <h2 style={styles.modalTitle}>Edit Expense</h2>
            <ExpenseForm
              initialData={editingExpense}
              onSubmit={handleUpdateExpense}
              onCancel={() => setEditingExpense(null)}
            />
          </div>
        </div>
      )}

      {/* View Expense Detail */}
      {showDetail && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <h2 style={styles.modalTitle}>💵 ₹{showDetail.amount}</h2>
            <p style={styles.modalText}>
              <strong>Category:</strong> {showDetail.category}
            </p>
            <p style={styles.modalText}>
              <strong>Date:</strong> {new Date(showDetail.date).toLocaleDateString()}
            </p>
            <div style={styles.modalButtons}>
              <button
                style={styles.editButton}
                onClick={() => {
                  setEditingExpense(showDetail);
                  setShowDetail(null);
                }}
              >
                ✏️ Edit
              </button>
              <button
                style={styles.deleteButton}
                onClick={() => handleDeleteExpense(showDetail.id)}
              >
                🗑️ Delete
              </button>
              <button
                style={styles.closeButton}
                onClick={() => setShowDetail(null)}
              >
                ✖ Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#1f3a53',
    backgroundImage: 'url("https://your-image-url.com/bg-image.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    color: '#fff',
    padding: '20px',
  },
  expenseContainer: {
    backgroundColor: '#1c2a40',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '800px',
  },
  title: {
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  addButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  addButton: {
    backgroundColor: '#39a2db',
    color: '#fff',
    padding: '12px 24px',
    fontSize: '18px',
    border: 'none',
    borderRadius: '50px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  expenseItemsContainer: {
    marginTop: '20px',
  },
  expenseItem: {
    backgroundColor: '#fff',
    color: '#1f3a53',
    padding: '20px',
    marginBottom: '15px',
    borderRadius: '12px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  expenseItemContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  date: {
    fontSize: '14px',
    color: '#888',
  },
  noExpenses: {
    textAlign: 'center',
    color: '#bbb',
    fontSize: '18px',
  },
  modalOverlay: {
    position: 'fixed',
    inset: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '50',
  },
  modalContainer: {
    backgroundColor: '#fff',
    color: '#1f3a53',
    width: '90%',
    maxWidth: '500px',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  modalText: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  editButton: {
    backgroundColor: '#f9c74f',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#e63946',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  closeButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

const ExpenseForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [amount, setAmount] = useState(initialData.amount || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [date, setDate] = useState(initialData.date || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category || !date) return alert('All fields are required');
    onSubmit({ amount, category, date });
  };

  return (
    <form onSubmit={handleSubmit} style={styles2.form}>
      <div style={styles2.inputGroup}>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles2.input}
          required
        />
      </div>
      <div style={styles2.inputGroup}>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles2.input}
          required
        />
      </div>
      <div style={styles2.inputGroup}>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles2.input}
          required
        />
      </div>

      <div style={styles2.formButtons}>
        <button type="button" onClick={onCancel} style={styles2.cancelButton}>
          Cancel
        </button>
        <button type="submit" style={styles2.saveButton}>
          Save
        </button>
      </div>
    </form>
  );
};

const styles2 = {
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

export default ExpenseListPage;
