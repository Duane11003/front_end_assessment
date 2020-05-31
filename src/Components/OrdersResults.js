import React, { useState, useEffect, Fragment } from "react";
import WORK_ORDER_KEY from "../../WORK_ORDER_KEY";

function OrdersResults() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState(null);
  const [workerID, setWorkerID] = useState(null);
  const [workerName, setWorkerName] = useState([]);
  const [workerCompany, setWorkerCompany] = useState([]);

  const getWorkOrders = async () => {
    await fetch(WORK_ORDER_KEY)
      .then((res) => res.json())
      .then((response) => {
        setWorkOrder(response.orders);
        setError(false);
        setLoading(false);
        console.log(response.orders);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    getWorkOrders();
  }, []);

  if (loading === true) return <h3>Loading...</h3>;
  if (error) return <p>Error fetching workers</p>;

  const mappedWorkOrders = workOrder.map(
    ({ deadline, description, id, name, workerId }) => {
      return (
        <div key={id} className="workOrderContainer">
          <li key={id}>
            <h3>Work Order: {id}</h3>
            <p>{description}</p>
            <div>
              <p>Worker Id: {workerId}</p>
            </div>
            <p>{deadline}</p>
          </li>
        </div>
      );
    }
  );

  return (
    <Fragment>
      <div>
        <input
         placeholder='Worker Name'
         type='text'
        >
        </input>
      <ul className='unorderedList'>{mappedWorkOrders}</ul>
      </div>
    </Fragment>
  );
}

export default OrdersResults;
