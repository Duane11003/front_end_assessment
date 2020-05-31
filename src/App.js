import React from 'react'
import ReactDOM from "react-dom";
import OrdersResults from './Components/OrdersResults'


function App() {
    return (
        <div className='container'>
            <OrdersResults />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));
