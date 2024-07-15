TelegramClone

A responsive messaging app clone using React.js. Features include chat lists, message display with real-time updates, dark mode, and dynamic sidebar. Built with React Context API for state management and styled for usability.
Project Description: React.js Telegram Clone

This project is a front-end implementation of a Telegram-like messaging application built using React.js. It aims to replicate the core functionalities of Telegram, including real-time messaging, user interface elements, and responsive design.
Key Features:

    Responsive Design: The application adapts seamlessly to different screen sizes, ensuring a consistent user experience across devices.

    Context API: Utilizes React's Context API for state management, ensuring efficient data flow between components.

    Dark Mode: Includes a toggleable dark mode feature for enhanced usability in low-light environments.

    Chat Sections:
        Left Section: Displays a list of chats with options for new groups, channels, contacts, calls, saved messages, and settings.
        Right Section: Shows selected chat messages, supports message input, and dynamically loads additional messages as the user scrolls.

    Dynamic Interaction: Features interactive components such as collapsible sidebar for navigation and dynamic message rendering.

    Error Handling and Loading States: Provides robust error handling for data fetching errors and loading states with retry options.

Technologies Used:

    React.js: Front-end library for building user interfaces, managing state, and handling component interactions.

    CSS: Custom styling for responsive design and thematic variations (light/dark mode).

    React Markdown: Renders chat messages formatted in Markdown for enhanced readability.

Project Components:

    App Component: Orchestrates the main layout and manages screen size detection for responsive behavior.

    LeftSection Component: Manages chat list display, search functionality, sidebar interactions, and dark mode toggle.

    RightSection Component: Handles chat message display, including real-time updates, error handling, and message input functionality.

Bugs to be Fixed:

    Filter Functionality:
        The current implementation of filters in the chat list does not function correctly. Filters are supposed to refine the displayed chat list based on search queries, but there are issues where the filters may not accurately display the expected results.

    Chat List Scroll Reset:
        When scrolling through the chat list, the current behavior resets the scroll position to the beginning whenever the user reaches the bottom of the list. This disrupts the user experience, especially when navigating through a large number of chats.

Next Steps:

    Filter Functionality Fix: Investigate and resolve issues related to the filtering mechanism. Ensure that the search queries accurately filter the chat list based on the expected criteria.

    Chat List Scroll Improvement: Implement a solution to maintain the scroll position within the chat list. This involves enhancing the scrolling behavior to retain the user's position, especially when loading additional chats dynamically.



The project is currently deployed at xyz.
Contact:

For any questions or assistance regarding these issues, please contact rohitkedar2000@gmail.com.
