import React, { useState, useEffect, Fragment } from "react";
import WORK_ORDER_KEY from "../../WORK_ORDER_KEY";

function OrdersResults() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState(null);
  const [workerID, setWorkerID] = useState(null);
  const [workerName, setWorkerName] = useState(null);
  const [workerCompany, setWorkerCompany] = useState(null);

  useEffect(() => {
    fetch(WORK_ORDER_KEY)
      .then((res) => res.json())
      .then((response) => {
        setWorkOrder(response.orders);
        setError(false);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  console.log(workOrder);

  if (loading === true) return <h3>Loading...</h3>;
  if (error) return <p>Error fetching workers</p>;
  

  return (
    <Fragment>
      <div></div>
    </Fragment>
  );
}

export default OrdersResults;
