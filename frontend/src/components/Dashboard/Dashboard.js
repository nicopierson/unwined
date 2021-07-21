import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 

import { getOneWine, getWine, deleteWine, createWine, editWine } from '../../store/wine';
import WineCard from '../WineCard';

const DashBoard = () => {
  const dispatch = useDispatch();
  const [oneWine, setOneWine] = useState('hellow');

  const testPost = {
    name: "Tester wine",
    imageUrl: null,
    description: "Lorum ipsum tester lorum ipsum",
    province: "Andru Valley",
    country: "Austin Texas",
    price: 20,
    rating: 80,
    designation: "Le mealer",
    region_1: "Herm",
    region_2: null,
    userId: 2,
    wineryId: 2,
    colorTypeId: 1,
    wineTypeId: 2,
};


  const editPost = {
    id: 10001,
    name: "San Fran Wine",
    imageUrl: null,
    description: "Lorum ipsum tester lorum ipsum",
    province: "Bay Area",
    country: "San Francisco",
    price: 50,
    rating: 90,
    designation: "Le mealer",
    region_1: "Herm",
    region_2: null,
    userId: 2,
    wineryId: 2,
    colorTypeId: 1,
    wineTypeId: 2,
};

  useEffect(() => {
    dispatch(getWine());
  }, [dispatch]);

  const wines = useSelector((state) => {
    return state.wine;
  });

  const handleDelete = () => {
    dispatch(deleteWine(1));
  };

  const handlePost = () => {
    dispatch(createWine(testPost));
  };

  const handlePut = () => {
    dispatch(editWine(editPost));
  };


  return (
    <>
      <h2>Dashboard</h2>
      <h3>{wines[1]?.name}</h3>
      {/* <h3>{oneWine?.name}</h3> */}
      <div>
        <button
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <div>
        <button
          onClick={handlePost}
        >
          Post
        </button>
      </div>
      <div>
        <button
          onClick={handlePut}
        >
          Edit
        </button>
      </div>
      <div>
        <WineCard />
      </div>

      {/* {wines.length && (wines.map((wine) => (
        <p>{wine.name}</p>
      )))} */}
    </>
  );
};

export default DashBoard;