import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useParams, useHistory } from 'react-router-dom';

import styles from './EditWineForm.module.css';

const EditWineForm = React.forwardRef(({ setToggleEditPage }, ref) => {
  const { wineId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const wine = useSelector(state => state.wine[wineId]);
  const wineries = useSelector(state => state.winery);
  const winery = wineries[wineId];
  const wineTypes = useSelector(state => state.wineType);
  const colorTypes = useSelector(state => state.colorType);
  const wineType = wineTypes[wineId];
  const colorType = colorTypes[wine.colorTypeId];

  const [name, setName] = useState(wine.name);
  const [wineryState, setWinery] = useState(winery);
  const [price, setPrice] = useState(wine.price);
  const [description, setDescription] = useState(wine.description);
  const [country, setCountry] = useState(wine.country);
  const [province, setProvince] = useState(wine.province);
  const [rating, setRating] = useState(wine.rating);
  const [colorTypeState, setColorType] = useState(colorType.color);
  const [wineTypeState, setWineType] = useState(wineType.variety);
  const [region_1, setRegion_1] = useState(wine.region_1);
  const [region_2, setRegion_2] = useState(wine.region_2);
  const [designation, setDesignation] = useState(wine.designation);
  const [imageUrl, setImageUrl] = useState(wine.imageUrl ? wine.imageUrl : '');
  const [errorsArray, setErrorsArray] = useState([]);
  const [registrationArray, setRegistrationArray] = useState([]);


  const handleSubmit = (e) => {
    // handle the submit
    e.preventDefault();

    const registration = {
      id: sessionUser.id,
      name,
      winery: wineryState,
      price,
      description,
      country,
      province,
      rating,
      wineType: +wineTypeState,
      colorType: +colorTypeState,
      region_1,
      region_2,
      designation,
      imageUrl,
    };

    setRegistrationArray((prevState) => [ ...prevState, registration ]);
    reset();
  };

  const reset = () => {
    setName('');
    setWinery('');
    setPrice('');
    setDescription('');
    setCountry('');
    setProvince('');
    setRating('');
    setWineType('');
    setColorType('');
    setRegion_1('');
    setRegion_2('');
    setDesignation('');
    setImageUrl('');
  };

  useEffect(() => {
    const errors = [];
    if (name?.length < 2) errors.push('Name must have at least 2 characters.');
    if (winery?.length < 2) errors.push('Winery must have at least 2 characters.');
    if (description?.length > 280) errors.push('Description has a character limit of 280 characters.');

    setErrorsArray(errors);

  }, [name, winery, description]);

  return (
    <>
      <div>
        <h2>Edit Wine</h2>
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
              onChange={(event) => setName(event.target.value)}
              value={name}
              type='text' 
              name='name' 
              id='name' 
              placeholder='name'
            />
          </div>
          <div>
            <label htmlFor='winery'>Winery</label>
            <input 
              onChange={(event) => setWinery(event.target.value)}
              value={winery}
              type='winery' 
              id='winery' 
              name='winery' 
              placeholder='Winery'
            />
          </div>
          <div>
            <label htmlFor='price'>Price</label>
            <input 
              onChange={(event) => setPrice(event.target.value)}
              value={price}
              type='number' 
              id='price' 
              name='price' 
              placeholder='Price'
            />
          </div>
          <div>
            <label htmlFor='wineType'>Wine Type</label>
            <input 
              onChange={(event) => setWineType(event.target.value)}
              value={wineTypeState}
              type='text' 
              id='wineType' 
              name='wineType' 
              placeholder='Wine Type'
            />
          </div>
          <div>
            <label htmlFor='country'>Country</label>
            <input 
              onChange={(event) => setPrice(event.target.value)}
              value={country}
              type='text' 
              id='country' 
              name='country' 
              placeholder='Country'
            />
          </div>
          <div>
            <label htmlFor='description'>Description</label>
            <textarea 
              onChange={(event) => setDescription(event.target.value)}
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
              onChange={(event) => setPrice(event.target.value)}
              value={rating}
              type='number' 
              id='rating' 
              name='rating' 
              placeholder='Rating'
            />
          </div>
          <div>
            <label htmlFor='color'>Color</label>
            <input 
              onChange={(event) => setColorType(event.target.value)}
              value={colorTypeState}
              type='text' 
              id='colorType' 
              name='colorType' 
              placeholder='Color'
            />
          </div>
          <div>
            <label htmlFor='province'>Province</label>
            <input 
              onChange={(event) => setProvince(event.target.value)}
              value={province}
              type='text' 
              id='province' 
              name='province' 
              placeholder='Province'
            />
          </div>
          <div>
            <label htmlFor='region_1'>Region 1</label>
            <input 
              onChange={(event) => setRegion_1(event.target.value)}
              value={region_1}
              type='text' 
              id='region_1' 
              name='region_1' 
              placeholder='Region 1'
            />
          </div>
          <div>
            <label htmlFor='region_2'>Region 2</label>
            <input 
              onChange={(event) => setRegion_2(event.target.value)}
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
              onChange={(event) => setDesignation(event.target.value)}
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
              onChange={(event) => setImageUrl(event.target.value)}
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
          </div>
        </form>
      </div>
    </>
  );
});

export default EditWineForm;