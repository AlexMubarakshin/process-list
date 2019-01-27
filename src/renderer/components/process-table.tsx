import * as React from "react";
import ProcessList from "ps-list";

import { ProcessItemHeader } from "./process-table-header";
import { ProcessItem } from "./process-table-item";

import { Table } from "@material-ui/core";

interface IProcessTable {
    processes:  ProcessList.ProcessDescriptor[];
    isWindowsOS?: boolean;
}

export class ProcessTable extends React.Component<IProcessTable> {
    render() {
        const {processes, isWindowsOS} = this.props;
        return (
            <Table>
                <ProcessItemHeader fullRender={!isWindowsOS} />
                {
                    this.props.processes.map(process => (
                        <ProcessItem process={process} />
                    ))
                }
            </Table>
        );
    }

}