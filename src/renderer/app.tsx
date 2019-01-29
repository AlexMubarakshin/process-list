import * as React from "react";
import ProcessList from "ps-list";

import { platform } from "os";

import { AppBar, Tabs, Tab } from "@material-ui/core";

import { ProcessTable } from "./components/process-table";
import { ProcessGraph } from "./components/process-graph";

enum ApplicationTabs {
    TABLE = "TABLE",
    GRAPH = "GRAPH"
}

interface IAppProps { }

interface IAppState {
    processes: ProcessList.ProcessDescriptor[];
    currentTab?: ApplicationTabs;
}

export class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            currentTab: ApplicationTabs.TABLE,
            processes: []
        };
    }

    private timer: any;

    componentDidMount() {
        this.getProcessList();

        this.setupProcessUpdateTimer();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    private setupProcessUpdateTimer = () => {
        this.timer = setInterval(() => {
            clearInterval(this.timer);

            this.getProcessList(() => {
                this.setupProcessUpdateTimer();
            });
        }, 5000);

    }

    private getProcessList = async (cb?: (() => void)) => {
        const processes = await ProcessList();
        this.setState({
            processes
        }, cb);
    }

    private handleChange = (event: React.ChangeEvent<{}>, value: any) => {
        const nextTab: ApplicationTabs = ApplicationTabs[value] as ApplicationTabs;
        this.setState({
            currentTab: nextTab
        });
    }

    render() {
        const isWindowsOS = platform() === "win32";
        const { currentTab } = this.state;

        return (
            <>
                <AppBar position="static" >
                    <Tabs
                        centered
                        value={currentTab}
                        onChange={this.handleChange}>
                        <Tab
                            value={ApplicationTabs.TABLE}
                            label={"Table"} />
                        <Tab
                            value={ApplicationTabs.GRAPH}
                            label={"Graph"} />
                    </Tabs>
                </AppBar>
                {
                    this.state.currentTab === ApplicationTabs.TABLE ? (
                        <ProcessTable
                            isWindowsOS={isWindowsOS}
                            processes={this.state.processes} />
                    )
                    :
                    (
                        <ProcessGraph processes={this.state.processes}/>
                    )
                }
            </>
        );
    }
}
