import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useHistory, useParams } from 'react-router-dom';
import { editWine } from '../../store/wine';
import { createWine } from '../../store/wine';

import styles from './WineForm.module.css';

const WineForm = React.forwardRef(({ setToggleForm, method }, ref) => {
  const { wineId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // Store
  const sessionUser = useSelector(state => state.session.user);
  const wine = useSelector(state => state.wines[wineId]);
  const wineries = useSelector(state => state.wineries);
  const winery = wine && wineries[wine.wineryId] ? wineries[wine.wineryId] : '';
  const wineTypes = useSelector(state => state.wineTypes);
  const colorTypes = useSelector(state => state.colorTypes);
  const wineType = wine && wineTypes[wine.wineTypeId] ? wineTypes[wine.wineTypeId] : '';
  const colorType = wine ? colorTypes[wine.colorTypeId] : '';

  // State
  const [name, setName] = useState(wine?.name ? wine.name : '');
  const [wineryId, setWinery] = useState(winery ? winery.id : '');
  const [price, setPrice] = useState(wine?.price ? wine.price : '');
  const [description, setDescription] = useState(wine?.description ? wine.description : '');
  const [country, setCountry] = useState(wine?.country ? wine.country : '');
  const [province, setProvince] = useState(wine?.province ? wine.province : '');
  const [rating, setRating] = useState(wine?.rating ? wine.rating : '');
  const [colorTypeId, setColorType] = useState(colorType ? colorType.id : '');
  const [wineTypeId, setWineType] = useState(wineType ? wineType.id : '');
  const [region_1, setRegion1] = useState(wine?.region_1 ? wine.region_1 : '');
  const [region_2, setRegion2] = useState(wine?.region_2 ? wine.region_2 : '');
  const [designation, setDesignation] = useState(wine?.designation ? wine.designation : '');
  const [imageUrl, setImageUrl] = useState(wine?.imageUrl ? wine.imageUrl : '');
  const [errorsArray, setErrorsArray] = useState([]);
  
  // handle state onChange events
  const nameOnChange = (e) => setName(e.target.value);
  const wineryOnChange = (e) => setWinery(e.target.value);
  const priceOnChange = (e) => setPrice(+e.target.value);
  const descriptionOnChange = (e) => setDescription(e.target.value);
  const countryOnChange = (e) => setCountry(e.target.value);
  const provinceOnChange = (e) => setProvince(e.target.value);
  const ratingOnChange = (e) => setRating(e.target.value);
  const colorOnChange = (e) => setColorType(e.target.value);
  const wineTypeOnChange = (e) => setWineType(e.target.value);
  const region1OnChange = (e) => setRegion1(e.target.value);
  const region2OnChange = (e) => setRegion2(e.target.value);
  const designationOnChange = (e) => setDesignation(e.target.value);
  const imageUrlOnChange = (e) => setImageUrl(e.target.value);


  const handleSubmit = async (e) => {
    // handle the submit
    e.preventDefault();

    let imageUrlData = imageUrl;
    if (!imageUrl) imageUrlData = null;

    const payload = {
      id: wineId,
      userId: sessionUser.id,
      name,
      price,
      description,
      country,
      province,
      rating, 
      wineTypeId, 
      colorTypeId,
      wineryId,
      region_1,
      region_2,
      designation,
      imageUrl: imageUrlData,
    };

    if (!wineId) delete payload.id;

    // put or post
    let newWine;
    if (method === 'PUT') {
      newWine = await dispatch(editWine(payload));

    } else if (method === 'POST') {
      newWine = await dispatch(createWine(payload));
    }

    // check if response shows errors
    if (newWine.errors) {
      console.error(newWine.errors);
    } else {
      if (method === 'POST') {
        // push to new wine page after created
        history.push(`/wines/${newWine.id}`)
      } else {
        // otherwise set toggle off for edit page
        setToggleForm(false);
      }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setToggleForm(false);
  };

  useEffect(() => {
    const errors = [];
    if (name.length < 2) errors.push('Name must have at least 2 characters.');
    if (rating < 0) errors.push('Rating must be positive');
    if (rating > 100) errors.push('Rating must be less than or equal to 100');
    if (price < 0) errors.push('Rating must be positive');
    if (price > 10_000) errors.push('Rating must be reasonably priced');
    // if (winery?.length < 2) errors.push('Winery must have at least 2 characters.');
    if (description.length > 500) errors.push('Description has a character limit of 500 characters.');

    setErrorsArray(errors);

  }, [name, winery, description, rating, price]);

  return (
    <>
      <div>
        <h2> Wine</h2>
        <div className={styles.errors_container}>
          { errorsArray.length > 0 && errorsArray.map((error) => (
            <p className='errors' key={error}>
              {error}
            </p>
          ))}
        </div>
        <form className={styles.form}>
          <div>
            <label htmlFor='name'>Name</label>
            <input 
              onChange={nameOnChange}
              value={name}
              type='text' 
              name='name' 
              id='name' 
              placeholder='name'
              required
            />
          </div>
          <div>
            <label htmlFor='winery'>Winery</label>
            <select
              onChange={wineryOnChange}
              placeholder='Select a Winery'
              id='winery' 
              name='winery' 
              required
              value={!!wineryId ? wineryId : ''}
            >
              <option
                value=''
              >
                Select a Winery
              </option>
              { wineries && wineries.list.map(wineryId => 
                  <option 
                    key={wineryId} 
                    value={wineryId}
                  > 
                    {wineries[wineryId].name}
                  </option>
                )
              }
            </select>
          </div>
          <div>
            <label htmlFor='price'>Price</label>
            <input 
              onChange={priceOnChange}
              value={price}
              type='number' 
              id='price' 
              name='price' 
              placeholder='Price'
              required
            />
          </div>
          <div>
            <label htmlFor='wineType'>Wine Type</label>
            <select
              onChange={wineTypeOnChange}
              id='wineType' 
              name='wineType' 
              required
              value={!!wineTypeId ? wineTypeId : ''}
            >
              <option value=''>
                Select Wine Type
              </option>
              { wineTypes && wineTypes.list.map(wineTypeId => 
                  <option 
                    key={wineTypeId}
                    value={wineTypeId}
                  > 
                    {wineTypes[wineTypeId].variety}
                  </option>
                )
              }
            </select>
          </div>
          <div>
            <label htmlFor='country'>Country</label>
            <input 
              onChange={countryOnChange}
              value={country}
              type='text' 
              id='country' 
              name='country' 
              placeholder='Country'
              autoComplete='country'
              required
            />
          </div>
          <div>
            <label htmlFor='description'>Description</label>
            <textarea 
              onChange={descriptionOnChange}
              value={description}
              type='textarea' 
              id='description' 
              name='description'
              placeholder='Description'
            ></textarea>
          </div>
          <div>
            <label htmlFor='rating'>Rating</label>
            <input 
              onChange={ratingOnChange}
              value={rating}
              type='number' 
              id='rating' 
              name='rating' 
              placeholder='Rating'
            />
          </div>
          <div>   
            <label htmlFor='color'>Color</label>
            <select
              onChange={colorOnChange}
              id='color' 
              name='color' 
              required
              value={!!colorTypeId ? colorTypeId : ''}
            >
              <option value=''>
                Select Wine Color
              </option>
              { colorTypes && colorTypes.list.map(colorId => 
                  <option 
                    key={colorId}
                    value={colorId}
                  > 
                    {colorTypes[colorId].color}
                  </option>
                )
              }
            </select>
          </div>
          <div>
            <label htmlFor='province'>Province</label>
            <input 
              onChange={provinceOnChange}
              value={province}
              type='text' 
              id='province' 
              name='province' 
              placeholder='Province'
            />
          </div>
          <div>
            <label htmlFor='region1'>Region 1</label>
            <input 
              onChange={region1OnChange}
              value={region_1}
              type='text' 
              id='region1' 
              name='region1' 
              placeholder='Region 1'
            />
          </div>
          <div>
            <label htmlFor='region_2'>Region 2</label>
            <input 
              onChange={region2OnChange}
              value={region_2}
              type='text' 
              id='region_2' 
              name='region_2' 
              placeholder='Region 2'
            />
          </div>
          <div>
            <label htmlFor='designation'>Designation</label>
            <input 
              onChange={designationOnChange}
              value={designation}
              type='text' 
              id='designation' 
              name='designation' 
              placeholder='Designation'
            />
          </div>
          <div>
            <label htmlFor='imageUrl'>Image URL</label>
            <input 
              onChange={imageUrlOnChange}
              value={imageUrl}
              type='text' 
              id='imageUrl' 
              name='imageUrl' 
              placeholder='Image URL'
            />
          </div>
          <div>
            <button 
              type='submit' 
              disabled={errorsArray.length} 
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
});

export default WineForm;