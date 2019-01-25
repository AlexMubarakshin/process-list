import * as React from "react";
import ProcessList from "ps-list";

import { ProcessItem } from "./components/process-item";

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
            <table style={{border: 1, borderColor: "#000"}}>
                <tr>
                    <th>NAME</th>
                    <th>PID</th>
                    <th>PPID</th>
                    <th>MEMORY</th>
                    <th>CPU</th>
                    <th>CPU</th>
                </tr>
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
            </table>
        );
    }
}