import * as React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";

interface IProcessItemHeader {
    fullRender?: boolean;
}

export class ProcessItemHeader extends React.PureComponent<IProcessItemHeader> {
    render() {
        return (
            <TableHead>
                <TableRow>
                    <TableCell>NAME</TableCell>
                    <TableCell>PID</TableCell>
                    <TableCell>PPID</TableCell>
                    {
                        this.props.fullRender && (
                            <React.Fragment>
                                <TableCell>MEMORY</TableCell>
                                <TableCell>CPU</TableCell>
                                <TableCell>CMD</TableCell>
                            </React.Fragment>
                        )
                    }
                </TableRow>
            </TableHead>
        )
    }
}