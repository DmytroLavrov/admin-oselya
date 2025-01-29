import { useEffect, useState } from 'react';
import formatCurrency from '@utils/FormatCurrency';
import axios from 'axios';
import { backendUrl } from '../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import './Products.scss';

const Products = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + '/products');

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(backendUrl + '/products/delete', {
        headers: { token },
        data: { id },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="products">
      <h1 className="products__title title-1">Products</h1>
      {loading ? (
        <div className="products__spinner">
          <ClipLoader color="#141718" size={100} />
        </div>
      ) : (
        <div className="products__content">
          <div className="products__table-container">
            <table className="products__table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="products__image"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td data-value="$">{formatCurrency(product.price)}</td>
                    <td>
                      <button
                        onClick={() => {
                          removeProduct(product._id);
                        }}
                        className="products__button"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="products__cards-container">
            {products.map((product) => (
              <div key={product._id} className="products__card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="products__image"
                />
                <h3 className="products__name">{product.name}</h3>
                <p className="products__category">{product.category}</p>
                <p className="products__price" data-value="$">
                  {formatCurrency(product.price)}
                </p>
                <button
                  onClick={() => {
                    removeProduct(product._id);
                  }}
                  className="products__button"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
