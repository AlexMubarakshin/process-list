import * as React from "react";
import ProcessList from "ps-list";

import { Graph } from "react-d3-graph";

interface IProcessGraphProps {
    processes: ProcessList.ProcessDescriptor[];
}

interface IProcessGraphState {
    data: any;
    config: any;
}

export class ProcessGraph extends React.Component<IProcessGraphProps, IProcessGraphState> {
    componentWillMount() {
        const processData = this.convertToGraph(this.props.processes);

        this.setState({
            data: processData,
            config: this.defaultGraphConfig
        });

        window.addEventListener("resize", this.onWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onWindowResize);
    }

    private onWindowResize = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        this.setState({
            config: {
                ...this.state.config,
                height: windowHeight,
                width: windowWidth
            }
        })
    }

    private convertToGraph = (processes: ProcessList.ProcessDescriptor[]) => {
        const pids: { [pid: string]: ProcessList.ProcessDescriptor } = {}
        for (let index = 0; index < processes.length; index++) {
            const process = processes[index];
            pids[process.pid] = process;
        }
        const nodes = processes.map(process => ({ id: process.pid, label: process.name }));
        const links = processes
            .filter(process => (pids[process.ppid]))
            .map(process => ({ source: process.ppid, target: process.pid }));

        return { nodes, links };
    }

    private defaultGraphConfig = {
        height: window.innerHeight,
        width: window.innerWidth,
        node: {
            labelProperty: "label"
        }
    }


    render() {
        return (
            <Graph
                config={this.state.config}
                data={this.state.data}
                id={"process-graph"}
            />
        )
    }
}