# create-noodle-app
A CLI tool for creating template node projects.

The noodle-ness is unimportant. A random name generator gave me the NPM username [`noodles-please-me`](https://www.npmjs.com/~noodles-please-me), so now everything on NPM is noodle themed.

## Usage
Currently the package needs to be pulled and run locally:
* `git clone https://github.com/RyanMKrol/create-noodle-app`
* `cd create-noodle-app`
* `npm install`
* `npm run build`
* `npm link`
* `create-noodle-app`

## Background
Currently, every time I make a new node project, I have to go to one of the following two packages, and clone them manually:
* https://github.com/RyanMKrol/BaseNodeApiProject
* https://github.com/RyanMKrol/BaseNodeReactProject

I then have to replace every piece of boilerplate code in areas like:
* `package.json`
* `README.md`
* the deployment scripts

This CLI tool will do these tasks for me, speeding up the spin-up time for creating a new Node project!
