import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

export default function Products() {
  const [checked, setChecked] = useState(false);
  const { isLoading, error, data: products } = useQuery(['products', checked], async () =>{
    console.log(`${checked}..fetching`)
    return fetch(`data/${checked ? 'sale_' : ''}products.json`).then(res =>
      res.json()
    )
  }, {
    staleTime: 1000 * 60 * 5,
  }
   )
  //const [loading, error, products] = useProducts({ salesOnly: checked });
  const handleChange = () => setChecked((prev) => !prev);

  if (isLoading) return 'Loading...'
 
  if (error) return 'An error has occurred: ' + error.message

  return (
    <>
      <label>
        <input type='checkbox' checked={checked} onChange={handleChange} />
        Show Only 🔥 Sale
      </label>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <article>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
