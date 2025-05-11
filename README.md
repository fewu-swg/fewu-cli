# Fewu Command line interface

This is a tool that makes using `fewu` more easier.

The basic `fewu` _(>3.3.4)_ operations are only generating website and live server. This package is splited from `fewu` _(3.2.3)_ that support initialize, quickwrite and other operations not included in core `fewu`.

```sh
npm i fewu-cli # Install package
npx fewu --init # Do initialization
npx fewu --new "My first post" source/posts/my-first-post.md -c MyArticles -t FirstOfAll
npm i # Install dependencies for theme
npx fewu --server # Generate and startup local server.
```