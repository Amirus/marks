# Marks

#### Simplistic Markdown notebook

## Introduction

**Marks** is a simple notebook/wiki style app that allows you to sketch out, keep
track of, document what's keeping you awake and you're lugging around in your head.

It's simple and it works, feel free to clone and deploy on _Heroku_.

## Technologies

This app uses a **Node.js** backend, a vanilia javascript frontend using **React**.

Your notes/thoughts/documentation is secured using Google OAuth limiting access
to a single TLD (i.e. _@gmail.com_, _@outlook.com_), this is useful in orgs, but
hey, by deleting one line you can allow anyone in.

For now this app is built with multitenancy in mind but with no sharing feature
at all, in the future there will be a config option to enable or disable
multitenancy, that way, you can use **Marks** as a company wide wiki or as a
personal notes app.

Main libraries used:

- On the backend:
  - Express
  - Passport
  - Redis (session store)
  - RethinkDB (data store)
- On the frontend:
  - React
  - Browserify
  - Stylus
  - Ramda
  - Moment
  - Superagent
  - Custom build flux based on Reflux

## Getting started

```bash
npm install -g gulp
npm install
gulp dev
```

An before that you should have started the two _stores_ in separate terminals

```bash
redis-server
rethinkdb --http-port 9999
```

## Look and feel

Still WIP but gives an idea...

![Screenshot](https://raw.githubusercontent.com/kiasaki/marks/master/screenshot.png)
