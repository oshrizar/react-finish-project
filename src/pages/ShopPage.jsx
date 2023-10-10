import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import handleErrorFromAxios from "../utils/handleError";
import ProductsComponent from "../components/productsComponent/ProductsComponent";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [productsArr, setProductsArr] = useState([]);
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(
          "http://localhost:8181/api/cards/allCards"
        );
        if (
          ((payload && !payload.isAdmin) || !payload) &&
          (!data || !data.length)
        ) {
          toast.error(
            "no products for sale at the moment, please come back again later!"
          );
          navigate(ROUTES.HOME);
        }
        setProductsArr(data);
        setOriginalCardsArr(data);
      } catch (err) {
        handleErrorFromAxios(err, undefined, false);
        navigate(ROUTES.HOME);
      }
    })();
    localStorage.setItem("prev-page-for-back-arrow-btn", "shop");
  }, []);

  if (!productsArr) {
    return <CircularProgress />;
  }
  return (
    <ProductsComponent
      titleOfPage="Our Shop"
      subTitleOfPage="Here you can look at our products and add to your cart if you liked the
        item! Enjoy!"
      productsArrProp={productsArr}
      payloadProp={payload}
      setOriginalCardsArrFunc={setOriginalCardsArr}
      setProductsArrFunc={setProductsArr}
      originalCardsArrProp={originalCardsArr}
    />
  );
};

export default ProductsPage;
