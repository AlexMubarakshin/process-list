import * as React from "react";
import ProcessList from "ps-list";

import {TableRow, TableCell} from "@material-ui/core";

interface IProcessItemProps {
    process: ProcessList.ProcessDescriptor;
}

export class ProcessItem extends React.PureComponent<IProcessItemProps> {
    render() {
        const { process } = this.props;
        return (
            <TableRow className={"process-item"} >
                <TableCell className={"process-item--name"}>{process.name}</TableCell>
                <TableCell className={"process-item--pid"}>{process.pid}</TableCell>
                <TableCell className={"process-item--ppid"}>{process.ppid}</TableCell>
                <TableCell className={"process-item--memory"}>{process.memory}</TableCell>
                <TableCell className={"process-item--cpu"}>{process.cpu}</TableCell>
                <TableCell className={"process-item--cmd"}>{process.cmd}</TableCell>
            </TableRow>
        );
    }
}