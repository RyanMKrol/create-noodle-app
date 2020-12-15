# create-noodle-app

A CLI tool to help me setup new projects using project templates.

The noodle-ness is unimportant. A random name generator gave me the NPM username [`noodles-please-me`](https://www.npmjs.com/~noodles-please-me), so now everything on NPM is noodle themed.

## Usage

- `npm install -g create-noodle-app`
- `create-noodle-app`

## Background

Currently, every time I make a new node project, I have to go to one of the following two packages, and clone them manually:

- https://github.com/RyanMKrol/BaseNodeApiProject
- https://github.com/RyanMKrol/BaseNodeReactProject

I then have to replace every piece of boilerplate code in areas like:

- `package.json`
- `README.md`
- the deployment scripts

This CLI tool will do these tasks for me, speeding up the spin-up time for creating a new Node project!

Most importantly this will also help me codify the lessons I've learned, allowing me to benefit from my learnings automatically in future projects.

## Sources

This article provided a lot of boilerplate code:

- https://medium.com/@pongsatt/how-to-build-your-own-project-templates-using-node-cli-c976d3109129

A lot of the work I did in this project was cleaning the entire thing up, using proper patterns, and optimising the workflow.

You can find the article's source code here:

- https://github.com/pongsatt/mycli

## Notes

When creating a new template, you have to format certain files differently to how you might expect:

- package.json files must be package.txt
  - This is because the npm build process will pick up on any package.json file in the tree, so this is a quick way to solve this problem.
- .gitignore files must be gitignore.txt
  - Similar story to the above, but with git; git will pick up on any .gitignore file, so these need to be changed slightly to avoid this.
