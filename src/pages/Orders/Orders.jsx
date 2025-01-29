import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../../App';
import OrderDetails from '@components/OrderDetails/OrderDetails';
import { useResponsive } from '@hooks/useResponsive';
import formatCurrency from '@utils/FormatCurrency';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import './Orders.scss';

const Orders = ({ token }) => {
  const [ordersData, setOrdersData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isSmallScreen = useResponsive(640);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const fetchAllProducts = async () => {
    if (!token) {
      return null;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        backendUrl + '/orders/get',
        {},
        { headers: { token } }
      );

      if (data.success) {
        setOrdersData(data.orders);
      } else {
        toast.error('Error loading orders. Please try again');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error loading orders. Please try again');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen]);

  return (
    <div className="orders">
      <h1 className="orders__title title-1">Orders</h1>

      {loading ? (
        <div className="orders__spinner">
          <ClipLoader color="#141718" size={100} />
        </div>
      ) : (
        <div className="orders__table">
          {!isSmallScreen ? (
            <>
              <div className="orders__header">
                <div className="orders__column">Order ID</div>
                <div className="orders__column">Date</div>
                <div className="orders__column">Status</div>
                <div className="orders__column">Price</div>
              </div>
              <div className="orders__body">
                {ordersData?.map((order) => {
                  return (
                    <div key={order._id} className="orders__row">
                      <span className="orders__cell">{order?.date}</span>
                      <span className="orders__cell">
                        {formatDate(order?.date)}
                      </span>
                      <span className="orders__cell">
                        {order?.status || 'N/A'}
                      </span>
                      <span className="orders__cell" data-value="$">
                        {formatCurrency(order?.amount) || 'N/A'}
                      </span>
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="orders__btn-view button-primary"
                      >
                        View Details
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="orders__list">
                {ordersData?.map((order) => {
                  return (
                    <div key={order._id} className="orders__item">
                      <div className="orders__row">
                        <div className="orders__label">Order ID</div>
                        <div className="orders__value">{order?.date}</div>
                      </div>
                      <div className="orders__row">
                        <div className="orders__label">Date</div>
                        <div className="orders__value">
                          {formatDate(order?.date)}
                        </div>
                      </div>
                      <div className="orders__row">
                        <div className="orders__label">Status</div>
                        <div className="orders__value">
                          {order?.status || 'N/A'}
                        </div>
                      </div>
                      <div className="orders__row">
                        <div className="orders__label">Price</div>
                        <div className="orders__value" data-value="$">
                          {formatCurrency(order?.amount) || 'N/A'}
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="orders__btn-view button-primary"
                      >
                        View Details
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {isModalOpen && selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={handleCloseModal}
          token={token}
          fetchAllProducts={fetchAllProducts}
        />
      )}
    </div>
  );
};

export default Orders;
