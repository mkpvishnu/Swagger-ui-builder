# Swagger Contract Builder

A visual editor for designing OpenAPI (Swagger) specifications. This tool allows developers, product managers, and QA engineers to create API contracts before any code is written.

## Features

- **Visual Design**: Drag-and-drop interface for creating paths, operations, models, parameters, and responses
- **Real-time Preview**: Instantly see your API documentation with Swagger UI
- **Validation**: Lint your OpenAPI spec in real-time
- **Export**: Export to YAML or JSON with a single click
- **Theme Support**: Light and dark mode supported

## Architecture

This is an MVP implementation with the following components:

- React + TypeScript for the UI
- Zustand for state management
- ReactFlow for the visual graph editor
- Formik + Yup for form handling and validation
- Swagger UI for preview
- IndexedDB for local persistence

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/swagger-contract-builder.git

# Navigate to the project directory
cd swagger-contract-builder

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to see the application.

## Usage

1. **Create a New API**: Start with the default API template.
2. **Add Components**: Drag components from the sidebar onto the canvas.
3. **Configure Properties**: Use the property inspector to configure each component.
4. **Preview**: Switch to the "Preview" tab to see your API documentation in real-time.
5. **Export**: Use the "Export" button to download your OpenAPI specification.

## Project Structure

```
src/
├── components/         # React components
│   ├── Designer/       # Visual design components (canvas, nodes)
│   ├── Inspector/      # Property inspector components
│   ├── Preview/        # Swagger UI preview
│   └── Shared/         # Shared UI components
├── store/              # Zustand state management
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── workers/            # Web workers for linting
```

## Roadmap

This is an MVP implementation. Future enhancements include:

- Server-side persistence
- Multi-user collaboration
- Version control and diff viewer
- Code generation (client and server stubs)
- Plugin system for extensibility

## License

MIT
