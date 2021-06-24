import { Helmet } from 'react-helmet';
import { useContext, useState } from 'react';
import { AppContext } from '../Context';
/* import {
  Box,
  Container,
  Grid,
  Pagination
} from '@material-ui/core';
import ProductListToolbar from 'src/components/product/ProductListToolbar';
import ProductCard from 'src/components/product//ProductCard';
import products from 'src/__mocks__/products'; */

const ProductList = () => {
  const {
    product,
    productLength,
    editMode,
    cancelEdit,
    updateproduct,
    deleteproduct,
  } = useContext(AppContext);
    <Helmet>
      <title>Products | Material Kit</title>
    </Helmet>;
    // Storing users new data when they editing their info.
    const [newData, setNewData] = useState({});

    const saveBtn = () => {
      updateproduct(newData);
    };

    const updateNewData = (e, field) => {
      setNewData({
        ...newData,
        [field]: e.target.value,
      });
    };

    const enableEdit = (ProdID, ProdName, ProdPrice, ProdCost) => {
      setNewData({
        ProdID, ProdName, ProdPrice, ProdCost
      });
      editMode(ProdID);
    };

    const deleteConfirm = (ProdID) => {
      if (window.confirm('Are you sure?')) {
        deleteproduct(ProdID);
      }
    };

    return !productLength ? (
      <p>{productLength === null ? 'Loading...' : 'Please insert some product.'}</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th>產品名稱</th>
            <th>單價</th>
            <th>成本</th>
            <th>動作</th>
          </tr>
        </thead>
        <tbody>
          {product.map(({
            ProdID, ProdName, ProdPrice, ProdCost, isEditing
          }) => {
            return isEditing === true ? (
              <tr key={ProdID}>
                <td>
                  <input
                    type="text"
                    defaultValue={ProdName}
                    onChange={(e) => updateNewData(e, 'ProdName')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={ProdPrice}
                    onChange={(e) => updateNewData(e, 'ProdPrice')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={ProdCost}
                    onChange={(e) => updateNewData(e, 'ProdCost')}
                  />
                </td>
                <td>
                  <button className="btn green-btn" type="submit" onClick={() => saveBtn()}>
                    Save
                  </button>
                  <button
                    className="btn default-btn"
                    type="submit"
                    onClick={() => cancelEdit(ProdID)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={ProdID}>
                <td>{ProdName}</td>
                <td>{ProdPrice}</td>
                <td>{ProdCost}</td>
                <td>
                  <button
                    className="btn default-btn"
                    type="submit"
                    onClick={() => enableEdit(ProdID, ProdName, ProdPrice, ProdCost)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn red-btn"
                    type="submit"
                    onClick={() => deleteConfirm(ProdID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
};
/* (
  <>
    <Helmet>
      <title>Products | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <ProductListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {products.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Box>
  </>
); */

export default ProductList;
