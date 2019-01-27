declare module "react-d3-graph" {

    interface IGraphProps {
        id: string;
        data: any;
        config?: any;
    }

    export class Graph extends React.Component<IGraphProps> {

    }
}