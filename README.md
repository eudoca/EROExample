# KeaAI - Education Review Office

KeaAI is an on-premise LLM solution developed for the Education Review Office (ERO) to address the critical challenge of analyzing over 2,000 school Strategic Action Plans. The system helps ERO staff efficiently process unstructured documents, identify compliance gaps, and enable data-driven decision making while maintaining full data sovereignty within ERO's network.

## Project Overview

This implementation uses Bootstrap 5 as the frontend framework to create a responsive, accessible, and modern user interface for the KeaAI application. The application consists of four primary screens:

1. **Search and Ingestion Screen**: Upload, process, and search school Strategic Action Plans
2. **School Overview Grid**: Comprehensive view of all schools and their compliance status
3. **Alignment Analysis View**: Detailed analysis of how well school responses align with ERO findings
4. **Detailed School Analysis**: In-depth metrics and detailed breakdown for individual schools

## Technical Stack

- **Frontend Framework**: Bootstrap 5
- **CSS Preprocessor**: SCSS (for custom theming)
- **JavaScript**: Vanilla JS with Bootstrap's component initialization
- **Icons**: Bootstrap Icons
- **Responsive Design**: Mobile-first approach using Bootstrap's grid system

## Features

- **Document Upload**: Drag-and-drop file upload with progress tracking
- **Search Functionality**: Advanced search with filters for document types and regions
- **Data Visualization**: Progress bars and status indicators for compliance tracking
- **Interactive Tables**: Expandable rows with detailed information
- **Alignment Analysis**: Visual representation of alignment between school plans and ERO findings
- **AI-Generated Recommendations**: Suggestions for improvement based on document analysis
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server for local development (optional)

### Installation

1. Clone the repository or download the source code
2. Open the project in your preferred code editor
3. If using a local web server, start the server and navigate to the project directory
4. Open `index.html` in your browser to view the application

### Project Structure

```
keaai/
├── css/
│   └── styles.css       # Custom CSS styles
├── js/
│   └── main.js          # JavaScript functionality
├── pages/
│   ├── school-overview.html        # School Overview Grid
│   ├── alignment-analysis.html     # Alignment Analysis View
│   └── detailed-analysis.html      # Detailed School Analysis
├── index.html           # Search and Ingestion Screen (main entry point)
└── README.md            # Project documentation
```

## Customization

### Theming

The application uses Bootstrap 5's theming system with custom variables defined in the CSS. To customize the theme:

1. Modify the CSS variables in the `:root` selector in `css/styles.css`
2. Adjust component-specific styles as needed

### Adding New Components

To add new components to the application:

1. Use Bootstrap 5's component library as a foundation
2. Extend with custom CSS classes as needed
3. Initialize any JavaScript functionality in `js/main.js`

## Accessibility

The application follows accessibility best practices:

- Semantic HTML structure
- ARIA attributes for interactive elements
- Sufficient color contrast for text and UI elements
- Keyboard navigation support
- Screen reader compatibility

## Browser Support

The application is compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary and developed specifically for the Education Review Office (ERO).

## Acknowledgments

- Bootstrap 5 for the frontend framework
- Bootstrap Icons for the icon set 