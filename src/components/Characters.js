import React, { useState } from 'react'
import { useQuery } from 'react-query';
import Character from './Character';

export default function Characters() {
  const [page, setPage] = useState(1);

  const fetchCharacters = async ({ queryKey }) => {
    const response = await fetch (`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`);
    return response.json();
    // function that gets data from the api
};

    const{data, status} = useQuery(["characters", page], fetchCharacters, {keepPreviousData: true})

    console.log(data);

    if(status === "loading"){
      return <div>wait a second</div>
    }

    if(status === "error"){
      return <div>Error fetching data</div>
    }


  return (
    <div className='characters'>
      {data.results.map((character) => (
        <Character character={character}/>
      ))}
      <div>
        <button disabled={page === 1} onClick={() => setPage((old) => old -1)}>Previous</button>
        <button disabled={!data.info.next} onClick={() => setPage((old) => old + 1)}>Next</button>
      </div>
    </div>
  )
}
