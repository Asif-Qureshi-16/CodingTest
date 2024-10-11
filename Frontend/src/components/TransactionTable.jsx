import React, { useEffect, useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import { fetchTransactions } from '../services/api';

const TransactionTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchTransactions(selectedMonth, search, page);
      setTransactions(data.transactions);
      setTotalPages(Math.ceil(data.totalCount / 10)); // Assuming 10 items per page
    };

    getTransactions();
  }, [selectedMonth, search, page]);

  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Search Transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between">
        <Button
          disabled={page <= 1}
          onClick={() => setPage((prevPage) => prevPage - 1)}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          disabled={page >= totalPages}
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TransactionTable;
