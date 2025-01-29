import { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../../App';
import { toast } from 'react-toastify';
import { Select } from 'antd';
import './AddProduct.scss';
import UploadArea from './upload-area.png';

const { Option } = Select;

const AddProduct = ({ token }) => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Living Room');
  const [price, setPrice] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);

      if (!image) {
        toast.error('No image selected');
        return;
      }

      image && formData.append('image', image);

      const response = await axios.post(backendUrl + '/products', formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setImage(false);
        setName('');
        setDescription('');
        setPrice('');
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="add-product">
      <h1 className="add-product__title title-1">Add Product</h1>
      <form onSubmit={onSubmitHandler} className="add-product__form">
        <div className="add-product__form-group">
          <p>Upload image</p>
          <label
            htmlFor="image"
            className="add-product__label"
            style={{ width: '100px' }}
          >
            <img
              src={!image ? UploadArea : URL.createObjectURL(image)}
              style={{ width: '100px' }}
              alt="upload"
            />
            <input
              className="add-product__input"
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        </div>

        <div className="add-product__form-group">
          <label htmlFor="name" className="add-product__label">
            Product Name
          </label>
          <input
            className="add-product__input"
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            id="name"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="add-product__form-group">
          <label htmlFor="description" className="add-product__label">
            Product Description
          </label>
          <textarea
            className="add-product__textarea"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id="description"
            placeholder="Enter product description"
            required
          />
        </div>

        <div className="add-product__form-group">
          <p>Category</p>
          <Select
            className="add-product__select"
            value={category}
            onChange={(value) => setCategory(value)}
            style={{ width: '100%' }}
          >
            <Option value="Living Room">Living Room</Option>
            <Option value="Bedroom">Bedroom</Option>
            <Option value="Kitchen">Kitchen</Option>
            <Option value="Bathroom">Bathroom</Option>
            <Option value="Outdoor">Outdoor</Option>
          </Select>
        </div>

        <div className="add-product__form-group">
          <label htmlFor="price" className="add-product__label">
            Price (in cents)
          </label>
          <input
            className="add-product__input"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            id="price"
            placeholder="Enter product price"
            required
          />
        </div>

        <button type="submit" className="add-product__btn button-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
