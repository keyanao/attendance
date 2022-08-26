import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { AutoSizer, Column, Table } from '@enykeev/react-virtualized';
import React, { useEffect, useState } from 'react';
import { create } from '@mui/material/styles/createTransitions';
import Button from '@mui/material/Button';

const classes = {
  flexContainer: 'ReactVirtualizedDemo-flexContainer',
  tableRow: 'ReactVirtualizedDemo-tableRow',
  tableRowHover: 'ReactVirtualizedDemo-tableRowHover',
  tableCell: 'ReactVirtualizedDemo-tableCell',
  noClick: 'ReactVirtualizedDemo-noClick',
};


const styles = ({ theme }) => ({
  '& .ReactVirtualized__Table__headerRow': {
    ...(theme.direction === 'rtl' && {
      paddingLeft: '0 !important',
    }),
    ...(theme.direction !== 'rtl' && {
      paddingRight: undefined,
    }),
  },
  [`& .${classes.flexContainer}`]: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  [`& .${classes.tableRow}`]: {
    cursor: 'pointer',
  },
  [`& .${classes.tableRowHover}`]: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  [`& .${classes.tableCell}`]: {
    flex: 1,
  },
  [`& .${classes.noClick}`]: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? 'right'
            : 'left'
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = styled(MuiVirtualizedTable)(styles);

// ---
function Attend() {
  const [attendance, setAttendance] = useState(true)
  return (
    <>
      <Button class="attend" onClick={() => setAttendance(!attendance)}>{attendance ? "出席" : "退席"}</Button>
    </>
  )
}



const sample = {//idで読み取ってデータベースから取ってくる
  id1: {
    name: "大久保",
    states: false,
    week: 10,
    month: 40,
    pp: 19
  },

  id2: {
    name: "大月",
    states: true,
    week: 10,
    month: 40,
    pp: 19
  },
  id3: {
    name: "あさはら",
    states: true,
    week: 5,
    month: 53,
    pp: 19
  },
  id4: {
    name: "さいとう",
    states: false,
    week: 2,
    month: 65,
    pp: 19
  },
  id5: {
    name: "そがめ",
    states: true,
    week: 12,
    month: 54,
    pp: 19
  },
}

const rows = [];
Object.keys(sample).forEach(function (key) {
  if (sample[key].states === false) {
    sample[key].states = "退席"
  }else { 
     sample[key].states = "出席"
  } 
  rows.push(sample[key])
});


export default function Main() {
  return (
    <>
      <div>
        <Attend/>  
      </div>
      <div>
        <Paper style={{ height: 940, width: '100%' }}>
          <VirtualizedTable
            rowCount={rows.length}
            rowGetter={({ index }) => rows[index]}
            columns={[
              {
                width: 400,
                label: '名前',
                dataKey: 'name',
              },
              {
                width: 380,
                label: '状況',
                dataKey: 'states',
                numeric: true,
              },
              {
                width: 380,
                label: '週間',
                dataKey: 'week',
                numeric: true,
              },
              {
                width: 380,
                label: '月間',
                dataKey: 'month',
                numeric: true,
              },
              {
                width: 380,
                label: 'Protein\u00A0(g)',
                dataKey: 'pp',
                numeric: true,
              },
            ]}
          />
        </Paper>
      </div>
    </>
  );
}
