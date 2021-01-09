import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import './App.css';

function EarthImaginary() {

    const [date , setDate] = useState('');
    const [longatude , setLongatude] = useState('');
    const [altitude , setAltitude] = useState('');
    const [dim , setDim] = useState('');
    const [query , setQuery] = useState({});

    const api_key = 'myapikey';

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
      }));

    const classes = useStyles();

    const updateDate = e => {
        setDate(e.target.value);
        //console.log(place);
    }

    const updateLongatude = e => {
        setLongatude(e.target.value);
        //console.log(longatude);
    }

    const updateAltitude = e =>{
        setAltitude(e.target.value);
        //console.log(altitude);
    }

    const updateDim = e => {
        setDim(e.target.value)
        console.log(dim);
    }

    const getSearch = e => {
        e.preventDefault();
        //setQuery(search);
        //setSearch('');
        console.log(date);
        console.log(longatude);
        console.log(altitude);
        fetchData();
      }

      async function fetchData() {
          const response = await fetch(`https://api.nasa.gov/planetary/earth/assets?lon=${longatude}&lat=${altitude}&&date=${date}&dim=${dim}&api_key=${api_key}`).catch(
              err => {
                  console.log('eror'+err);
              }
          );
          const data = await response.json();
          console.log(data);
          setQuery(data);
      }


    return(
        <div className='sat__img'>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={getSearch}>
                <Input placeholder="YYYY-MM-DD" inputProps={{ 'aria-label': 'description' }} value={date} onChange={updateDate}/>
                <Input placeholder="Longitude" inputProps={{ 'aria-label': 'description' }} value={longatude} onChange={updateLongatude}/>
                <Input placeholder="Latitude"  inputProps={{ 'aria-label': 'description' }} value={altitude} onChange={updateAltitude}/>
                <Input placeholder="W & H of image in degrees"  inputProps={{ 'aria-label': 'description' }} value={dim} onChange={updateDim}/>
                <Button variant="contained" color="primary" type='submit'>
                    Submit
                </Button>
            </form>
            {query.msg}
            <h3>{query.id}</h3>
            <h3>{query.date}</h3>
            <img src={query.url} />
        </div>
    );
}

export default EarthImaginary;
