import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useHistory, useParams } from 'react-router-dom';
import { editWine, createWine } from '../../store/wine';
import { getWineries } from '../../store/winery';

import styles from './WineForm.module.css';

const WineForm = React.forwardRef(({ setToggleForm, method, title }, ref) => {
  const { wineId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // Store
  const sessionUser = useSelector(state => state.session.user);
  const wine = useSelector(state => state.wines[wineId]);
  const wineries = useSelector(state => state.wineries);
  const winery = wine && wineries[wine.wineryId] ? wineries[wine.wineryId] : '';
  const wineTypes = useSelector(state => state.wineTypes);
  // const colorTypes = useSelector(state => state.colorTypes);
  const wineType = wine && wineTypes[wine.wineTypeId] ? wineTypes[wine.wineTypeId] : '';
  // const colorType = wine ? colorTypes[wine.colorTypeId] : '';

  // State
  const [name, setName] = useState(wine?.name ? wine.name : '');
  const [wineryId, setWinery] = useState(winery ? winery.id : '');
  const [price, setPrice] = useState(wine?.price ? wine.price : '');
  const [description, setDescription] = useState(wine?.description ? wine.description : '');
  const [country, setCountry] = useState(wine?.country ? wine.country : '');
  const [province, setProvince] = useState(wine?.province ? wine.province : '');
  const [rating, setRating] = useState(wine?.rating ? wine.rating : '');
  // const [colorTypeId, setColorType] = useState(colorType ? colorType.id : '');
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
  // const colorOnChange = (e) => setColorType(e.target.value);
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
      colorTypeId: 2, // hard code to red wine //TODO implement later
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
    dispatch(getWineries());
  }, [dispatch]);

  useEffect(() => {
    const errors = [];
    if (name.length < 2) errors.push('Name must have at least 2 characters.');
    if (rating < 0) errors.push('Rating must be positive');
    if (rating > 100) errors.push('Rating must be less than or equal to 100');
    if (price < 0) errors.push('Price must be positive');
    if (price > 10_000) errors.push('Price must be reasonably priced');
    if (description.length > 500) errors.push('Description has a character limit of 500 characters.');

    setErrorsArray(errors);

  }, [name, winery, description, rating, price]);

  return (
    <div className={styles.wine_form_container}>
      <form className={styles.form_container}>
        <div className={`${styles.header} ${styles.form_input}`}>
          <h2>{title}</h2>
          <p className={styles.required_text}>* Indicates required field.</p>
          <div className={styles.errors_container}>
            { errorsArray.length > 0 && errorsArray.map((error) => (
              <p className='errors' key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.wrapper}>
          <div className={`${styles.form_input} ${styles.required}`}>
          {/* <h4>General Info</h4> */}
            <input 
              onChange={nameOnChange}
              value={name}
              type='text' 
              name='name' 
              id='name' 
              required
            />
            <label htmlFor='name'>Name*</label>
          </div>
          <div className={`${styles.form_input} ${styles.not_required}`}>
            <input 
              onChange={designationOnChange}
              value={designation}
              type='text' 
              id='designation' 
              name='designation' 
              placeholder=' '
            />
            <label htmlFor='designation'>Designation</label>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.form_input}>
            <select
              onChange={wineryOnChange}
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
            <label htmlFor='winery'>Winery*</label>
          </div>
          <div className={styles.form_input}>
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
            <label htmlFor='wineType'>Wine Type*</label>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={`${styles.form_input} ${styles.required}`}>
            <input 
              onChange={priceOnChange}
              value={price}
              type='number' 
              id='price' 
              name='price' 
              required
            />
            <label htmlFor='price'>Price*</label>
          </div>
          <div className={`${styles.form_input} ${styles.required}`}>
            <input 
              onChange={ratingOnChange}
              value={rating}
              type='number' 
              id='rating' 
              name='rating'
              required
            />
            <label htmlFor='rating'>Rating</label>
          </div>
          
          {/* 
          //TODO implement color later   
          <div className={styles.form_input}> 
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
            <label htmlFor='color'>Color</label>
          </div> */}
        </div>
        
        <div className={styles.wrapper}>
           <div className={`${styles.form_input} ${styles.required}`}>
            <input 
              onChange={countryOnChange}
              value={country}
              type='text' 
              id='country' 
              name='country' 
              autoComplete='country'
              required
            />
            <label htmlFor='country'>Country*</label>
          </div>
          
          <div className={`${styles.form_input} ${styles.not_required}`}>
            <input 
              onChange={provinceOnChange}
              value={province}
              type='text' 
              id='province' 
              name='province' 
              placeholder=' '
            />
            <label htmlFor='province'>Province</label>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={`${styles.form_input} ${styles.not_required}`}>
            <input 
              onChange={region1OnChange}
              value={region_1}
              type='text' 
              id='region1' 
              name='region1'
              placeholder=' '
            />
            <label htmlFor='region1'>Region 1</label>
          </div>
          <div className={`${styles.form_input} ${styles.not_required}`}>
            <input 
              onChange={region2OnChange}
              value={region_2}
              type='text' 
              id='region2' 
              name='region2' 
              placeholder=' '
            />
            <label htmlFor='region2'>Region 2</label>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={`${styles.form_input} ${styles.not_required}`}>
            <input 
              onChange={imageUrlOnChange}
              value={imageUrl}
              type='text' 
              id='imageUrl' 
              name='imageUrl' 
              placeholder=' '
            />
            <label htmlFor='imageUrl'>imageUrl</label>
          </div>
        </div>

        <div className={styles.wrapper}>
          <div className={`${styles.form_input} ${styles.not_required} ${styles.description}`}>
            <textarea 
              onChange={descriptionOnChange}
              value={description}
              type='textarea' 
              id='description' 
              name='description'
              placeholder=' '
            ></textarea>
            <label htmlFor='description'>Description</label>
          </div>
        </div>
        
        <div className={`${styles.form_input} ${styles.form_submit}`}>
          <button
            onClick={handleCancel}
            className={styles.cancel}
          >
            Cancel
          </button>
          <button 
            type='submit' 
            disabled={errorsArray.length} 
            onClick={handleSubmit}
            className={styles.submit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
});

export default WineForm;