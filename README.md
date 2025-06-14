<div align="center">
  <img src="src/assets/recipe-book.png" width="250" height="auto" alt="Recipe Book"/>
</div>

# Recipe Finder

Web app to search for recipes.

In this app you can search for recipes by name or by ingredient. You can also browse recipes by category.

> This project has been created as part of a technical test.

### Features

- Search for recipes by name or by ingredient
- View detailed recipe information
- Browse recipes by category
- Add recipes to favorites

### How to run the project

1. Clone the repository
2. Run `nvm use`
3. Run `npm install`
4. Run `npm run dev`

### How to run tests

1. Run `npm run test`

### Technologies used

- **React**
- **TypeScript**
- **Vitest** for testing
- **React Router** for routing
- **Tailwind CSS** for styling
- **Jotai** for state management
- **SWR** for data fetching
- **use-debounce** for debouncing input

### Design

The web app has a simple and modern design. It focuses on few primary colors and clean shapes. It uses icons from [react-feather](https://feathericons.com/), which enhance clarity while maintaining a lightweight, elegant look.

The design follows a mobile-first approach. To improve usability on smaller screens, a carousel is used to allow smooth and intuitive navigation on mobile devices.

### Architecture

The project is inspired by the principles of [Hexagonal Architecture](https://alexkondov.com/hexagonal-inspired-architecture-in-react/), aiming to clearly separate the core business logic from external concerns such as the framework, user interface, or data persistence. All the business logic is located in the `src/services` folder. The presentation layer is located in the `src/pages` folder.

### Testing

The project uses Vitest for testing. The tests are located at the same level of the files they are testing. You can check the coverage by running `npm run test:coverage`.

### Build analysis

You can check the build analysis by running `npm run build:analyze`. It uses [Rsdoctor](https://rsdoctor.rs/).

### API

The project uses the free [Themealdb API](https://www.themealdb.com/api.php) to fetch recipes.

### Next steps

- Improve the Favorite flow, allow users to create lists with names to organize recipes
- Split the components into smaller components (e.g.: recipe-favorite-page)
- Keep horizontal scroll position (in carousel) when navigating between pages
- Disable the scroll icon buttons when there is no scrollable content

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Author

[Christian Predebon](https://www.christianpredebon.it/)