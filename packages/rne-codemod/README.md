# react-native-paper-codemod

[![Build Status][build-badge]][build]
[![MIT License][license-badge]][license]
[![PRs Welcome][prs-welcome-badge]][prs-welcome]
[![Chat][chat-badge]][chat]

## Setup & Run

1. `yarn global add jscodeshift`
1. `git clone https://github.com/callstack/react-native-paper-codemod.git` or download a zip file from `https://github.com/callstack/react-native-paper-codemod/archive/master.zip`
1. Run `yarn install` in the react-native-paper-codemod directory
1. `jscodeshift -t <codemod-script> <path>`
   - `codemod-script` - path to the transform file, see available scripts below;
   - `path` - files or directory to transform;
   - use the `-d` option for a dry-run and use `-p` to print the output for comparison;
   - use the `--extensions` option if your files have different extensions than `.js` (for example, `--extensions js,jsx`);
   - if you use flowtype, you might also need to use `--parser=flow`;
   - see all available [jscodeshift options](https://github.com/facebook/jscodeshift#usage-cli).

## Included scripts

### `material-next`

Migrate codebase using react-native-paper v1.0 to v2.0. The full list of breaking changes can be found [here](https://github.com/callstack/react-native-paper/wiki/Migration-guide-for-2.0).

```sh
jscodeshift -t react-native-paper-codemod/transforms/material-next.js <path>
```

#### `material-next` script supports following transforms:

#### It will rename imports and jsx tags:

- `Toolbar` → `Appbar.Header`
- `ToolbarBackAction` → `Appbar.BackAction`
- `ToolbarContent` → `Appbar.Content`
- `CardActions` → `Card.Actions`
- `CardContent` → `Card.Content`
- `CardCover` → `Card.Cover`
- `DialogActions` → `Dialog.Actions`
- `DialogContent` → `Dialog.Content`
- `DialogScrollArea` → `Dialog.ScrollArea`
- `DialogTitle` → `Dialog.Title`
- `DrawerItem` → `Drawer.Item`
- `DrawerSection` → `Drawer.Section`
- `FABGroup` → `FAB.Group`
- `ListAccordion` → `List.Accordion`
- `ListItem` → `List.Item`
- `ListSection` → `List.Section`
- `RadioButtonGroup` → `RadioButton.Group`
- `Paper` → `Surface`
- `SearchBar` → `Searchbar`

It will wrap in Portal components that are no longer wrapped in Portal by default.

It will remove color prop from DrawerItem component and set the proper color via theme prop.

## Contributing

Read the [contribution guidelines](/CONTRIBUTING.md) before contributing.

<!-- badges -->

[build-badge]: https://img.shields.io/circleci/project/github/callstack/react-native-paper-codemod/master.svg?style=flat-square
[build]: https://circleci.com/gh/callstack/react-native-paper-codemod
[license-badge]: https://img.shields.io/npm/l/react-native-paper.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT
[prs-welcome-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs-welcome]: http://makeapullrequest.com
[chat-badge]: https://img.shields.io/discord/426714625279524876.svg?style=flat-square&colorB=758ED3
[chat]: https://discord.gg/zwR2Cdh
