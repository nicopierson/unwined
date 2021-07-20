import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'redux'; 

import { getWine } from '../../store/wine';

const DashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWine());
  }, [dispatch]);

  const wines = useSelector((state) => {
    return state.wine;
  });


  return(
    <>
      {wines.length && wines.map((wine) => (
        <p>{wine.name}</p>
      ))}
    </>
  );
};

export default DashBoard;