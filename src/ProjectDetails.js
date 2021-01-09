import React , {useEffect , useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


function ProjectDetails(props){

    const [projectDescription , setProjectDescription] = useState({});
    const [information , setInformation] = useState({});
    const api_key = 'O4caK6V8qbtc4DU2WLn7ukYaZ52bGZAeFKYYHCiu';

    useEffect(() =>{
        async function fetchData(){
            const id = await props.location.state.id;
            const x = await id;
            const response = await fetch(`https://api.nasa.gov/techport/api/projects/${id}?api_key=${api_key}`);
            const data = await response.json();
            //console.log(data);
            setProjectDescription(data.project);
        }
        fetchData();
    },[])

    //console.log(projectDescription);

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            overflow: 'hidden',
            padding: theme.spacing(0, 3),
        },
        paper: {
            maxWidth: 1400,
            margin: `${theme.spacing(1)}px auto`,
            padding: theme.spacing(2),
        },
    }));

    

    const classes = useStyles();

    

    
    return(
    <div className={classes.root}>
    
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>I</Avatar>
          </Grid>
          <Grid item xs>
            { projectDescription.title && <Typography><strong>Title:</strong>{projectDescription.title}</Typography>}
            { projectDescription.id && <Typography><strong>Project ID:</strong>{projectDescription.id}</Typography>}
            { projectDescription.status && <Typography><strong>Status:</strong>{projectDescription.status}</Typography>}
            { projectDescription.startDate && <Typography><strong>Start Date:</strong>{projectDescription.startDate}</Typography>}
            { projectDescription.endDate && <Typography><strong>End Date:</strong>{projectDescription.endDate}</Typography>}
          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>I</Avatar>
          </Grid>
          <Grid item xs>
            { projectDescription.benefits && <Typography><strong>Benefits:</strong>{projectDescription.benefits}</Typography>}
          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>I</Avatar>
          </Grid>
          <Grid item xs>  
                <Typography><strong>Work Locations</strong></Typography>
            { projectDescription.workLocations && 
                projectDescription.workLocations.map((item) => (
                    <Typography>{item}</Typography>
                ))
            }
          </Grid>
        </Grid>
      </Paper>
    </div>
    )
}

export default ProjectDetails;