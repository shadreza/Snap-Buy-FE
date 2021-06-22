import React , {useEffect, useState} from 'react';
import './EmployeeManagesOrder.css';

const EmployeeManagesOrder = () => {

    const [allOrders, setAllOrders] = useState([]);

    const setOrders = () => {
        // axios
    }

    useEffect(() =>{
        setOrders();
    }, allOrders)

    const [allManagers, setAllManagers] = useState([]);

    const setMangers = () => {
        // axios
    }

    useEffect(() =>{
        setMangers();
    }, allManagers)

    const finish = () => {
        // the work is done
    }

    return (
        <div className="emp-adding-orders">
            hi
            {allOrders.map(item =>
                <div className="orders">
                    <img src={item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.qty}</p>
                    <button onClick={()=>{finish()}}>Finish Preparation</button>
                </div>
            )}
        </div>
    );
};

export default EmployeeManagesOrder;