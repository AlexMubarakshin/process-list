import * as React from "react";
import ProcessList from "ps-list";

interface IProcessItemProps {
    process: ProcessList.ProcessDescriptor;
}

export class ProcessItem extends React.PureComponent<IProcessItemProps> {
    render() {
        const { process } = this.props;
        return (
            <tr className={"process-item"} >
                <td className={"process-item--name"}>{process.name}</td>
                <td className={"process-item--pid"}>{process.pid}</td>
                <td className={"process-item--ppid"}>{process.ppid}</td>
                <td className={"process-item--memory"}>{process.memory}</td>
                <td className={"process-item--cpu"}>{process.cpu}</td>
                <td className={"process-item--cmd"}>{process.cmd}</td>
            </tr>
        );
    }
}