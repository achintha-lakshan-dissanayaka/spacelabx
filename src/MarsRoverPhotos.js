import React , {useEffect, useState} from 'react';
import './MarsRoverPhotos.css';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


function MarsRoverPhotos(){

    const [tiledata , setTileData] = useState([]);
    
    const api_key = 'O4caK6V8qbtc4DU2WLn7ukYaZ52bGZAeFKYYHCiu';

    useEffect(() => {
        async function fetchData(){
            const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=100&api_key=${api_key}`)
            const data = await response.json();
            //console.log(data);
            setTileData(data.photos);
        }
        fetchData();
    },[])

    //console.log(tiledata);

    return(
        <div className='root'>
            <GridList cellHeight={400} className='gridList'>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <h1 className='root__title'>Captured By Curiosity Rover</h1>
                </GridListTile>
                            {tiledata.map((tile) => (
                                <GridListTile key={tile.id}>
                                    <img src={tile.img_src} alt='image' />
                                    <GridListTileBar
                                    title={tile.rover.name}
                                    subtitle={<span>by: {tile.camera.name}</span>}
                                    actionIcon={
                                        <IconButton aria-label={`info from ${tile.camera.name}`} className='icon'>
                                        <InfoIcon />
                                        </IconButton>
                                    }
                                    />
                    </GridListTile>
                    ))}
            </GridList>
        </div>
    );
}

export default MarsRoverPhotos;