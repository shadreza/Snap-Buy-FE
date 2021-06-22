import React , {useEffect, useState} from 'react';
import './AdminAddsPrd.css';

const AdminAddsPrd = () => {

    const [allPrds, setAllPrds] = useState([]);

    const setPrd = () => {
        // axios
    }

    const add10more = () => {
        // adding 10 more
    }

    useEffect(() =>{
        setPrd();
    }, allPrds)

    return (
        <div className="admin-adding-prd">
            hi
            {allPrds.map(item =>
                <div className="prd">
                    <img src={item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.qty}</p>
                    <button onClick={()=>{add10more()}}>Add 10 more</button>
                </div>
            )}
        </div>
    );
};

export default AdminAddsPrd;