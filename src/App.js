import React from 'react'
import ReactDOM from "react-dom";
import OrdersResults from './Components/OrdersResults'


function App() {
    return (
        <div>
            <OrdersResults />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));
