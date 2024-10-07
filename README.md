# React + Vite

Event Management Website

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Run

npm i

npm run dev

# Features

View Events: Users can view a list of upcoming events with search functionality.

Create and Edit Events: Admins can create and update event details like title, date, type, location, and description.

RSVP: Users can RSVP to events with statuses like "Yes, I'll attend" or "No, I can't attend".

Search: Users can search for events by title or type.

Real-time Database: The app uses Firebase Realtime Database for storing event details and RSVP statuses.

# Usage

Viewing Events
Users can view the list of all events on the homepage.
They can click on the "Show More" button on any event card to view the full details of the event.

# RSVP to Events

On the event details page, users can select their RSVP status from a dropdown (Yes or No).
They can submit their RSVP, and it will be saved in the Firebase database.

