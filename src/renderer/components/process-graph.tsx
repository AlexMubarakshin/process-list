import * as React from "react";
import ProcessList from "ps-list";

import { Graph } from "react-d3-graph";

interface IProcessGraphProps {
    processes: ProcessList.ProcessDescriptor[];
}

interface IProcessGraphState {
    processes: { [pid: string]: ProcessList.ProcessDescriptor };
    data: any;
    config: any;
}

export class ProcessGraph extends React.Component<IProcessGraphProps, IProcessGraphState> {

    componentWillMount() {
        const processData = this.convertToGraph(this.props.processes);
        this.setState({
            data: { nodes: processData.nodes, links: processData.links },
            config: this.defaultGraphConfig,
            processes: processData.processes
        });

        window.addEventListener("resize", this.onWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onWindowResize);
    }

    componentWillReceiveProps() {
        const processData = this.convertToGraph(this.props.processes);
        this.setState({
            data: { nodes: processData.nodes, links: processData.links },
            config: this.defaultGraphConfig,
            processes: processData.processes
        });
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

    private onClickNode = (processID: number) => {
        console.log(this.state.processes[processID]);
    }

    // For better work react-d3-graph with ID, because string better than number
    private modifyProcessList = (processList: ProcessList.ProcessDescriptor[]) => {
        const modifiedProcessList = [];
        for (let pid = 0; pid < processList.length; pid++) {
            const process = processList[pid];
            (process as any).pid = `${process.pid}`;
            (process as any).ppid = `${process.ppid}`;

            modifiedProcessList.push(process);
        }

        return modifiedProcessList;
    }


    private convertToGraph = (processes: ProcessList.ProcessDescriptor[]) => {
        const modifyedProcessList = this.modifyProcessList(processes);
        const pids: { [pid: string]: ProcessList.ProcessDescriptor } = {}
        for (let index = 0; index < modifyedProcessList.length; index++) {
            const process = modifyedProcessList[index];
            pids[process.pid] = process;
        }

        const nodes = modifyedProcessList.map(process => {
            const nodeConfig = { color: "#d3d3d3", symbolType: "circle" };

            if ((process as any).pid === "0") {
                nodeConfig.color = "#ba68c8";
                nodeConfig.symbolType = "DIAMOND";
            } else if (!pids[process.ppid]) {
                nodeConfig.color = "#3f51b5";
                nodeConfig.symbolType = "STAR";
            }

            return {
                id: process.pid,
                label: process.name,
                symbolType: nodeConfig.symbolType,
                color: nodeConfig.color
            }
        });

        const links = modifyedProcessList
            .filter(process => (!!pids[process.ppid]))
            .map(process => ({ source: process.ppid, target: process.pid }));

        return { nodes, links, processes: pids };
    }

    private defaultGraphConfig = {
        automaticRearrangeAfterDropNode: true,
        height: window.innerHeight,
        width: window.innerWidth,
        directed: true,
        nodeHighlightBehavior: true,
        node: {
            labelProperty: "label",
            highlightStrokeColor: "#9c27b0"
        }
    }

    render() {
        return (
            <Graph
                id={"process-graph"}
                config={this.state.config}
                data={this.state.data}
                onClickNode={this.onClickNode}
            />
        )
    }
}