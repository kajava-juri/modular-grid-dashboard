export type GridConfig = {
    columns: number;
    rows: number;
    isOverlay?: boolean;
}

export type GridItemPosition = {
    x: number; // Column index
    y: number; // Row index
};

export const GridItemTypes = {
    text: 'text',
    chart: 'chart', 
    line: 'line',
    table: 'table'
} as const;


export type GridItem = {
    id: string;
    type: typeof GridItemTypes[keyof typeof GridItemTypes];
    data: any; // Based on the type
    name: string;
    size: {
        width: number;
        height: number;
    }
}

export type TextGridItem = GridItem & {
    type: typeof GridItemTypes.text;
    data: string;
};

export type LinePlotGridItem = GridItem & {
    type: typeof GridItemTypes.line;
    data: {
        values: number[];
        xLabel: string;
        yLabel: string;
    };
};

export type DashboardConfig = {
    id: string;
    name: string;
    widgets: GridItem[];
    grid: GridConfig;
}