# Recipe Finder

### How to setup

1. Clone the repository
2. Run `nvm use`
3. Run `npm install`
4. Run `npm run dev`

### How to run tests

1. Run `npm run test`

### Stack

- React
- TypeScript
- Vitest
- React Router
- Tailwind CSS

### Design

This recipe finder project has a simple and modern design. It focuses on few primary colors and clean shapes. It uses icons from [react-feather](https://feathericons.com/), which enhance clarity while maintaining a lightweight, elegant look.

The design follows a mobile-first approach. To improve usability on smaller screens, a carousel is used to allow smooth and intuitive navigation on mobile devices.

### Architecture

The project is inspired by the principles of Hexagonal Architecture, aiming to clearly separate the core business logic from external concerns such as the framework, user interface, or data persistence. All the business logic is located in the `src/services` folder. The presentation layer is located in the `src/pages` folder.

### Testing

The project uses Vitest for testing. The tests are located at the same level of the files they are testing.

### API

The project uses the free [Themealdb API](https://www.themealdb.com/api.php) to fetch recipes.

### Next steps

- Let's add a way to save the recipes to a local list
