import React from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

const CellPhoneTable = (props) => {

    const renderHeader = () => (
        <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
        >
            <TableRow>
                <TableHeaderColumn>Number</TableHeaderColumn>
                <TableHeaderColumn>Site</TableHeaderColumn>
                <TableHeaderColumn>Org</TableHeaderColumn>
                <TableHeaderColumn>Type</TableHeaderColumn>
            </TableRow>
        </TableHeader>
    );

    const renderBody = (data) => {
        return (
            <TableBody
            displayRowCheckbox={false}
            stripedRows
            showRowHover
            >
                {data.map(row => (
                    <TableRow>
                        {Object.keys(row).map(prop => (
                            <TableRowColumn>{row[prop]}</TableRowColumn>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        );

    };

    return (
        <div style={{ width: "80%" }}>
            <Table
                fixedHeader
                height="500px"
                selectable={false}
            >
                {renderHeader()}
                {renderBody(props.data)}
            </Table>
        </div>

    );
}

export default CellPhoneTable;