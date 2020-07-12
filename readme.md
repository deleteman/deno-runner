# DenoRunner
_Sample project for the Book "Introducing Deno" published by Apress._

This CLI utility allows you to define your permissions inside a `.flags` file inside your project and then simply run your scripts with a simpler command.

So instead of having to do:

```
$ deno run --allow-net --allow-read=/your-config-folder/config.json --allow-write=/output-dir --allow-env script.ts
```

With DenoRunner you can simply store all your security rules inside a single `.flags` file that looks like this:

```
--allow-net
--allow-read=/your-config-folder/config.json
--allow-write=/output-dir
--allow-env
```
And then run your script with:

```
$ denorun.js script.ts
```

# Installation
In order to install the CLI tool, clone this project and execute the `build.sh` command, you'll need to have Deno installed of course, and once executed, the bundle file will be built. That file will be a JavaScript executable which you should be able to use either by copying it into a folder within your `PATH` or adding the current location into your `PATH` env variable.

# Contributing
If you find a problem with this script or feel like you could add something useful, don't hesitate to send a PR over!

