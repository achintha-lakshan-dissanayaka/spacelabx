import React , {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import './fireball.css';

function SentryObjects() {

    const [fireballdata , setFireballdata] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://ssd-api.jpl.nasa.gov/sentry.api');
            const data = await response.json();
            setFireballdata(data.data);
            //createrows();
        }
        fetchData();
        //createrows();
    },[]);

    function createrows() {
        //console.log('rowscreated');
        fireballdata.map((record) => {
            const x = createData(record['ip'] , record['range'] , record['ps_cum'] , record['diameter'] , record['ps_max'] , record['h'] , record['last_obs'] , record['v_inf'] , record['fullname'] , record['n_imp']);
            //console.log(x);
            rows.push(x) 
        })
    }

    //console.log(fireballdata);

    const columns = [
        { id: 'ip', label: 'The cumulative probability that the tabulated impact will occur', minWidth: 75 },
        { id: 'range', label: 'Year Range', minWidth: 75 },
        {
          id: 'ps_cum',
          label: 'The cumulative hazard rating according to the Palermo technical impact hazard scale',
          minWidth: 75,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'diameter',
          label: 'Diameter (km)',
          minWidth: 75,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'ps_max',
          label: 'Maximum hazard rating according to the Palermo technical impact hazard scale',
          minWidth: 75,
          align: 'right',
          format: (value) => value.toFixed(2),
        },
        {
            id: 'h',
            label: 'Absolute Magnitude (a measure of the intrinsic brightness of the object)',
            minWidth: 75,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'last_obs',
            label: 'Date and time (UTC) of the last observation used in the analysis',
            minWidth: 75,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'v_inf',
            label: 'hyperbolic excess velocity (km/s)',
            minWidth: 75,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'fullname',
            label: 'Full name/designation of the object',
            minWidth: 75,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'n_imp',
            label: 'Velocity at atmospheric entry (km/s)',
            minWidth: 75,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
      ];

      function createData(ip, range, ps_cum, diameter ,ps_max , h , last_obs , v_inf , fullname , n_imp) {

        return {ip, range, ps_cum, diameter ,ps_max , h , last_obs , v_inf , fullname , n_imp};
      }

      const rows = [];

      const useStyles = makeStyles({
        root: {
          width: '100%',
        },
        container: {
          maxHeight: 500,
        },
      });

      const classes = useStyles();
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(10);

      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    return(
    <div>
        <div className='fireball__heading'>
            <h1>The Potential Future Earth Impact Events</h1>
        </div>
        <div>
                <Paper className={classes.root}>
                {createrows()}
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            </Paper>
        </div>
    </div>
    );
}

export default SentryObjects;