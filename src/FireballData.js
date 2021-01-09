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

function FireballData() {

    const [fireballdata , setFireballdata] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://ssd-api.jpl.nasa.gov/fireball.api?date-min=2015-01-01&req-alt=true');
            const data = await response.json();
            setFireballdata(data.data);
            //createrows();
        }
        fetchData();
        //createrows();
    },[]);

    function createrows() {
        //console.log('rowscreated');
        //console.log(fireballdata);
        fireballdata.map((record) => {
            const x = createData(record[0] , record[1] , record[2] , record[3] , record[4] , record[5] , record[6] , record[7] , record[8]);
            //console.log(x);
            rows.push(x) 
        })
    }

    //console.log(fireballdata);

    const columns = [
        { id: 'date', label: 'time of peak brightness (GMT)', minWidth: 180 },
        { id: 'energy', label: 'approximate total radiated energy (10^10 joules)', minWidth: 75 },
        {
          id: 'impacte',
          label: 'approximate total impact energy (kt)',
          minWidth: 75,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'lat',
          label: 'latitude at peak brightness (degrees)',
          minWidth: 75,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'latdir',
          label: 'latitude direction (“N” or “S”)',
          minWidth: 75,
          align: 'right',
          format: (value) => value.toFixed(2),
        },
        {
            id: 'lon',
            label: 'longitude at peak brightness (degrees)',
            minWidth: 75,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'londir',
            label: 'atitude direction (“E” or “W”)',
            minWidth: 75,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'alt',
            label: 'altitude above the geoid at peak brightness (km)',
            minWidth: 75,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'vel',
            label: 'velocity at peak brightness (km/s)',
            minWidth: 75,
            align: 'right',
            format: (value) => value.toFixed(2),
        }
      ];

      function createData(date, energy, impacte, lat ,latdir , lon , londir , alt , vel) {

        return {date, energy, impacte, lat ,latdir , lon , londir , alt , vel};
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
            <h1>Fireball Atmospheric Impact Data Reported By US Government Sensors</h1>
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

export default FireballData;