import React , {useState , useEffect}from 'react';
import './fireball.css';
import {Link} from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

function ComEnjection(){

    let today = new Date();
    let enddate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate());
    let startdate = (today.getFullYear() - 1) + '-' + (today.getMonth() + 1) + '-' + (today.getDate());
    //console.log('sttttt '+ startdate);
    const api_key = 'myapikey';
    
    const[comdata , setComdata] = useState([]);

    useEffect(()=>{
        async function getData(){
            const response = await fetch(`https://api.nasa.gov/techport/api/projects?updatedSince=${startdate}&api_key=${api_key}`);
            const data = await response.json();
            const arr = data.projects.projects;
            const first50 = arr.slice(0 , 50);
            setComdata(first50)
            //console.log(data);
        }
        getData();
    },[])

    //console.log(comdata);
    function ListItemLink(props) {
        return <ListItem button component="a" {...props} />;
    }

    return(
        <div>
        <div className='fireball__heading'>
            <h1> NASA Technology Project IDs with LastUpdated</h1>
        </div>
        <div className='instructions'>
            <h3>Select Any Required Project ID for Further Details</h3>
        </div>
            <List component="nav" aria-label="secondary mailbox folders">
                {comdata.map((item) => (
                    <Link className='projects__links' to={{
                        pathname: '/projects',
                        state: {
                            id: item.id
                        }
                    }}>
                        <ListItemLink href="#simple-list" key={item.id}>
                            <ListItemText primary={item.id} />
                            <ListItemText primary={item.lastUpdated} />
                            <Divider />
                        </ListItemLink>
                    </Link>
                ))}
            </List>
        </div>
    );
}

export default ComEnjection;
