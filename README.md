# nofi

**npm Online-First Installer**

Do you switch between online/offline environments somewhat regularly?

### Installation/Usage

- `npm i -g nofi`
- Replace all your `npm install` commands with `nofi`

### Examples

```fish
✖︎  npm install
✔︎  nofi
```
```fish
✖︎  npm install --save foo
✔︎  nofi --save foo
```
```fish
✖︎  npm install --save-dev foo
✔︎  nofi --save-dev foo
```
```fish
✖︎  npm install --save-optional foo
✔︎  nofi --save-optional foo
```

Flag aliases and installing multiple packages work as well...

- `nofi -S foo`
- `nofi -D foo bar`
- `nofi -O foo bar baz`

### How does it work?

0. Test internet connection using [is-online](https://github.com/sindresorhus/is-online).
0. If online, use `npm install --force` to install/cache the latest package.
0. If offline, use `npm install --cache-min Infinity` to install _from_ your cache (usually located in `~/.npm`).
