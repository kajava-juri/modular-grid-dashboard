export type GridConfig = {
    columns: number;
    rows: number;
}

export type GridItemPosition = {
    x: number; // Column index
    y: number; // Row index
};

export const GridItemTypes = {
    text: 'text',
    chart: 'chart', 
    table: 'table'
} as const;


export type GridItem = {
    id: string;
    type: typeof GridItemTypes[keyof typeof GridItemTypes];
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


export type DashboardConfig = {
    id: string;
    name: string;
    widgets: GridItem[];
    grid: GridConfig;
}