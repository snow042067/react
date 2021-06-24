import { useEffect, useState } from "react";

export const Actions = () => {
  let [product, setproduct] = useState([]);

    //productLength is for showing the Data Loading message.
  let [productLength, setproductLength] = useState(null);

  useEffect(() => {
    fetch("http://localhost/php-react/all-product.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setproduct(data.product);
          setproductLength(true);
        } else {
          setproductLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Inserting a new product into the database.
  const insertproduct = (newproduct) => {
    fetch("http://localhost/php-react/add-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newproduct),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.ProdID) {
          setproduct([
            {
              ProdID: data.ProdID,
              ...newproduct,
            },
            ...product,
          ]);
          setproductLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Enabling the edit mode for a listed product.
  const editMode = (ProdID) => {
    product = product.map((product) => {
      if (product.ProdID === ProdID) {
        product.isEditing = true;
        return product;
      }
      product.isEditing = false;
      return product;
    });
    setproduct(product);
  };

  // Cance the edit mode.
  const cancelEdit = (ProdID) => {
    product = product.map((product) => {
      if (product.ProdID === ProdID) {
        product.isEditing = false;
        return product;
      }
      return product;
    });
    setproduct(product);
  };

  // Updating a product.
  const updateproduct = (productData) => {
    fetch("http://localhost/php-react/update-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          product = product.map((product) => {
            if (product.ProdID === productData.ProdID) {
              product.isEditing = false;
              product.ProdName = productData.ProdName;
              product.ProdPrice = productData.ProdPrice;
              product.ProdCost = productData.ProdCost;
              return product;
            }
            return product;
          });
          setproduct(product);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Deleting a product.
  const deleteproduct = (theID) => {
      // filter outing the product.
    let productDeleted = product.filter((product) => {
      return product.ProdID !== theID;
    });
    fetch("http://localhost/php-react/delete-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ProdID: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setproduct(productDeleted);
          if (product.length === 1) {
            setproductLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    product,
    editMode,
    cancelEdit,
    updateproduct,
    insertproduct,
    deleteproduct,
    productLength,
  };
};