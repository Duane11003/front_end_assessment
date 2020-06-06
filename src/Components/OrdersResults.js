import React, { useState, useEffect, Fragment } from "react";
import WORK_ORDER_KEY from "../../WORK_ORDER_KEY";
import WORKER_API_KEY from "../../WORKER_API_KEY";

function OrdersResults() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState(null);
  const [workerID, setWorkerID] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [workerName, setWorkerName] = useState([]);
  const [workerCompany, setWorkerCompany] = useState([]);
  const [input, setInput] = useState("");

  const getWorkOrders = async () => {
    await fetch(WORK_ORDER_KEY)
      .then((res) => res.json())
      .then((response) => {
        setWorkOrder(response.orders);
        setError(false);
        setLoading(false);
        const workerIds = response.orders.map(({ workerId }) => {
          return workerId;
        });
        return workerIds;
      })
      .then((workerIds) => {
        workerIds.map((item) => {
          fetch(`${WORKER_API_KEY}${item}`)
            .then((res) => res.json())
            .then((res) => setWorkers(res));
        });
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

  // const filterResults = (input, id) => {
  //   console.log(input);
  //   const filteredArr = workOrder.filter((input) => input.id !== id);
  //   setWorkOrder(filteredArr);
  // };

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            filterResults(input, workerID);
          }}
        >
          <input
            placeholder="Worker Name"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
        <ul className="unorderedList">{mappedWorkOrders}</ul>
      </div>
    </Fragment>
  );
}

export default OrdersResults;
