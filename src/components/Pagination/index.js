import React, { useEffect, useState } from 'react';
import './styles.scss';
import clsx from 'clsx';

const Header = ({limit, selected, parentCallback}) => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        if(limit && limit>0) {
            const tempItems = [];
            for(let i = 1; i<=limit; i++) {
                tempItems.push({
                    label: i,
                    value: i
                })
            }
            setItems([...tempItems]);
        }
        
    }, [limit]);

  return (
    <nav className="pagination d-flex justify-content-center">
        {items && items.length > 0 && items.map((i) => (
            <button id={`pagebtn${i.value}`} key={`pagebtn${i.value}`} className={clsx('pagination--btn', {'active': selected === i.value})} onClick={() => parentCallback({newPage: i.value})}>{i.label}</button>
        ))}
    </nav>
  );
}

export default Header;
