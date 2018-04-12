# Polymer 3.0 Sandbox

[Polymer 3.0 Sandbox](https://polymer-3-sandbox.firebaseapp.com/) displays live-editable Polymer 3.0 code samples.

Built with the Polymer 3.0 preview, currently using [`@3.0.0-pre.12`](https://www.polymer-project.org/blog/2018-03-23-polymer-3-latest-preview.html). Requires `^1.7.0-pre.8` of the [Polymer CLI tools](https://github.com/Polymer/tools).

* [Browsers](#browsers)
* [Setup](#serve)

## Browsers

The app and the plunker samples use es6 imports.

Working in:

* Chrome latest
* Firefox Nightly (will work in v54-60 if `dom.moduleScripts.enabled`)
* Safari 11.0.3

If you've tried it in another browser, let me know how it went :)

## Setup

Pre-requisites: git, yarn, npm. Then:

``` 
npm install -g polymer-cli@next
git clone https://github.com/katejeffreys-projects/polymer-3-sandbox.git
cd polymer-3-sandbox
yarn install --flat
polymer serve
```

Point your browser at the `applications` URL. E.g:

```
~/polymer-3-sandbox > polymer serve
info: [cli.command.serve]    Files in this directory are available under the following URLs
      applications: http://127.0.0.1:2020
      reusable components: http://127.0.0.1:2020/components/polymer-3-sandbox/
```

In the example above, you'd open `http://127.0.0.1:2020` not the `reusable components` URL.

## Build

```
polymer build
```
