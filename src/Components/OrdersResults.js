import React, { useState, useEffect, Fragment } from "react";
import WORK_ORDER_KEY from "../../WORK_ORDER_KEY";
import axios from "axios";

function OrdersResults() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState(null);
  const [workerID, setWorkerID] = useState([]);
  const [workerName, setWorkerName] = useState([]);
  const [workerCompany, setWorkerCompany] = useState([]);
  const [workerImage, setWorkerImage] = useState("");

  const getWorkOrders = () => {
    axios
      .get(WORK_ORDER_KEY)
      .then((response) => {
        setWorkOrder(response.data.orders);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  useEffect(() => {
    getWorkOrders();
  }, []);

  const mappedWorkOrders = () => {
    workOrder.map(({ deadline, description, id, workerId }) => {
      axios
        .get(`https://www.hatchways.io/api/assessment/workers/${workerId}`)
        .then((response) => {
          setWorkerName(response.data.name);
          setWorkerCompany(response.data.company);
          setWorkerImage(response.data.image);
        });
      <li key={id}>
        <h2>Work Order: {id}</h2>
        <p>Description: {description}</p>
        <p>Deadline: {deadline}</p>
        <p>Worker: {workerName}</p>
        <p>{workerCompany}</p>
      </li>;
    });
  };


  if (loading === true) return <h3>Loading...</h3>;
  if (error) return <p>Error fetching workers</p>;

  console.log(workOrder, "is the work order array");

  

  return (
    <Fragment>
      <div>
        <input placeholder="Worker Name" type="text"></input>
        <ul className="unorderedList">{mappedWorkOrders}</ul>
      </div>
    </Fragment>
  );
}

export default OrdersResults;
