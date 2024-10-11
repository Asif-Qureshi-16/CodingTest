import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import TransactionTable from './components/TransactionTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import {
  Chart as ChartJS,
  CategoryScale,  // For 'category' scale
  LinearScale,
  BarElement,
  ArcElement,     // For 'arc' element (used in pie/doughnut charts)
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);


const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <Container>
      <h1>Product Transactions Dashboard</h1>
      <Form.Group controlId="monthSelect">
        <Form.Label>Select Month</Form.Label>
        <Form.Control as="select" value={selectedMonth} onChange={handleMonthChange}>
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Row>
        <Col md={8}>
          <TransactionTable selectedMonth={selectedMonth} />
        </Col>
        <Col md={4}>
          <Statistics selectedMonth={selectedMonth} />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <BarChart selectedMonth={selectedMonth} />
        </Col>
        <Col md={6}>
          <PieChart selectedMonth={selectedMonth} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
