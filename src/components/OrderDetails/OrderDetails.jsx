import { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../../App';
import { Select } from 'antd';
import formatCurrency from '@utils/FormatCurrency';
import { toast } from 'react-toastify';
import closeIcon from './close.svg';
import './OrderDetails.scss';

const { Option } = Select;

const OrderDetails = ({ order, onClose, token, fetchAllProducts }) => {
  const [status, setStatus] = useState(order.status);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const statusHandler = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + '/orders/status',
        { orderId: order._id, status },
        { headers: { token } }
      );

      if (data.success) {
        await fetchAllProducts();
        toast.success('Order status updated successfully');
      } else {
        toast.error('Failed to update order status');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating order status');
    }
  };

  return (
    <div className="orders-modal">
      <div className="orders-modal__content">
        <div className="orders-modal__header">
          <h2 className="orders-modal__title">Order Details</h2>
          <button className="orders-modal__close" onClick={onClose}>
            <img src={closeIcon} alt="close-icon" />
          </button>
        </div>
        <div className="orders-modal__body">
          <p>
            <strong>Order ID:</strong> {order.date}
          </p>
          <p>
            <strong>Date:</strong> {formatDate(order.date)}
          </p>
          <p>
            <strong>Price:</strong> ${formatCurrency(order.amount)}
          </p>
          <p>
            <strong>Payment method:</strong> {order.paymentMethod}
          </p>
          <p>
            <strong>Payment status:</strong> {order.payment ? 'Paid' : 'Unpaid'}
          </p>
          <p>
            <strong>Status:</strong> {status}
          </p>
        </div>
        <div className="orders-modal__info">
          <h3>Order Information</h3>
          {order.items.map((item, index) => (
            <div key={item._id} className="orders-modal__item">
              <p>
                <strong>Item №{index + 1}:</strong> {item.name || 'N/A'}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity || 'N/A'}
              </p>
              <p>
                <strong>Price:</strong> ${formatCurrency(item.price || 0)}
              </p>
            </div>
          ))}
        </div>
        <div className="orders-modal__status">
          <h3>Order Status</h3>
          <Select
            value={status}
            onChange={handleStatusChange}
            style={{ width: '100%', marginBottom: '8px' }}
          >
            <Option value="Order Placed">Order Placed</Option>
            <Option value="Processing">Processing</Option>
            <Option value="Shipped">Shipped</Option>
            <Option value="Delivered">Delivered</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
          <button
            className="orders-modal__update-btn button-primary"
            onClick={statusHandler}
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
