import * as React from "react";
import ProcessList from "ps-list";

import { ProcessItem } from "./components/process-item";

import { Table, TableHead, TableRow, TableCell } from "@material-ui/core";

interface IAppProps {

}

interface IAppState {
    processes?: ProcessList.ProcessDescriptor[];
}

export class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            processes: []
        }
    }

    componentDidMount() {
        this.getProcessList();
    }

    private getProcessList = async () => {
        const processes = await ProcessList();
        this.setState({
            processes
        });
    }

    render() {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>NAME</TableCell>
                        <TableCell>PID</TableCell>
                        <TableCell>PPID</TableCell>
                        <TableCell>MEMORY</TableCell>
                        <TableCell>CPU</TableCell>
                        <TableCell>CPU</TableCell>
                    </TableRow>
                </TableHead>
                {
                    this.state.processes && this.state.processes.length ? (
                        this.state.processes.map(process => (
                            <ProcessItem process={process} />
                        ))
                    )
                        :
                        (
                            <h2>Loading ...</h2>
                        )
                }
            </Table>
        );
    }
}