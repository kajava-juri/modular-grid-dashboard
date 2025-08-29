# Modular Grid Dashboard

A flexible, JSON-configurable dashboard system built with SvelteKit, TypeScript, and tRPC. Create customizable grid-based dashboards with modular widgets for displaying sensor data, charts, and easily add your own.

Widget placement is done using CSS grids. Dashboard size is calculated based on the available, viewable, screen size, for example 6x2 dashboard means that 2 row sizes will fill the screen height and divided into 6 columns. Third and fourth row will be the next screen size and so on. See image below for 6x2 example.

## Features

- **JSON Configuration** - Define your dashboard layout via simple JSON files
- **Modular Widgets** - Text, charts, tables, and easily extensible widget types
- **Grid-Based Layout** - Responsive grid system with customizable columns and rows
- **TypeScript Support** - Full type safety and IntelliSense
- **SvelteKit Powered** - Fast, modern web framework with SSR support
- **tRPC Integration** - Type-safe API calls with automatic client-server synchronization

![first screenshot of widgets](https://i.imgur.com/XKZmynq.png)

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Edit `static/dashboard.json` to customize your dashboard

## Dashboard Configuration

```json
{
    "id": "test-dashboard",
    "name": "Test Dashboard",
    "grid": {
        "columns": 4,
        "rows": 2
    },
    "widgets": [
        {
            "id": "widget-1",
            "type": "text",
            "data": "Widget 1",
            "size": {
                "width": 2,
                "height": 2
            }
        },
        {
            "id": "widget-3",
            "type": "line",
            "data": "Widget 3",
            "size": {
                "width": 4,
                "height": 1
            }
        },
        {
            "id": "widget-2",
            "type": "text",
            "data": "Widget 2",
            "size": {
                "width": 1,
                "height": 1
            }
        },
        {
            "id": "widget-4",
            "type": "text",
            "data": "Widget 4",
            "size": {
                "width": 3,
                "height": 1
            }
        },
        {
            "id": "widget-5",
            "type": "text",
            "data": "Widget 5",
            "size": {
                "width": 3,
                "height": 1
            }
        }
    ]
}
```

## Widget Types

- **Text** - Display simple text content
- **Chart** - Line and bar charts (coming soon)
- **Table** - Tabular data display (coming soon)
- **Custom** - Easily add your own widget types

## Use Cases

- IoT sensor dashboards
- System monitoring
- Data visualization
- Real-time analytics
- Custom reporting interfaces

---

Perfect for hobby projects, prototyping, or building production dashboards with minimal setup.
