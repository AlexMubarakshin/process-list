import * as React from "react";
import ProcessList from "ps-list";

import { Graph } from "react-d3-graph";

interface IProcessGraphProps {
    processes: ProcessList.ProcessDescriptor[];
}

interface IProcessGraphState {
    data: any;
}

export class ProcessGraph extends React.Component<IProcessGraphProps, IProcessGraphState> {
    componentWillMount() {
        const processData = this.convertToGraph(this.props.processes);
        
        this.setState({
            data: processData
        });
    }


    private convertToGraph = (processes: ProcessList.ProcessDescriptor[]) => {
        const pids: { [pid: string]: ProcessList.ProcessDescriptor } = {}
        for (let index = 0; index < processes.length; index++) {
            const process = processes[index];
            pids[process.pid] = process;
        }
        const nodes = processes.map(process => ({ id: process.pid }));
        const links = processes
            .filter(process => (pids[process.ppid]))
            .map(process => ({ source: process.ppid, target: process.pid }));

        return { nodes, links };
    }


    render() {
        return (
            <Graph
                id={"process-graph"}
                data={this.state.data}
            />
        )
    }
}