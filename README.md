# Modular Grid Dashboard

A flexible, JSON-configurable dashboard system built with SvelteKit, TypeScript, and tRPC. Create customizable grid-based dashboards with modular widgets for displaying sensor data, charts, and easily add your own.

## Features

- **JSON Configuration** - Define your dashboard layout via simple JSON files
- **Modular Widgets** - Text, charts, tables, and easily extensible widget types
- **Grid-Based Layout** - Responsive grid system with customizable columns and rows
- **TypeScript Support** - Full type safety and IntelliSense
- **SvelteKit Powered** - Fast, modern web framework with SSR support
- **tRPC Integration** - Type-safe API calls with automatic client-server synchronization

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Edit `static/dashboard.json` to customize your dashboard

## Dashboard Configuration

```json
{
  "id": "my-dashboard",
  "name": "My Dashboard",
  "grid": {
    "columns": 4,
    "rows": 2
  },
  "widgets": [
    {
      "id": "widget-1",
      "type": "text",
      "data": "Hello World",
      "size": {
        "width": 2,
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
