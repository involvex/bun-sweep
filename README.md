# bun-sweep

A CLI tool for cleaning project directories. Removes `node_modules` and build output folders recursively, inspired by [cargo-sweep](https://github.com/holmgr/cargo-sweep).

## Installation

```bash
bun install
```

## Usage

```bash
bun-sweep [options] [path]
```

### Options

| Flag                | Alias | Description                                                    |
| ------------------- | ----- | -------------------------------------------------------------- |
| `-r`, `--recursive` |       | Recursively clean `node_modules` in subdirectories             |
| `--dry-run`         |       | Preview what would be deleted without deleting                 |
| `--build-outputs`   |       | Clear `dist`, `out`, `dist-electron` instead of `node_modules` |
| `--version`, `-v`   |       | Show version number                                            |
| `--help`, `-h`      |       | Show help message                                              |

### Arguments

| Argument | Description                                                |
| -------- | ---------------------------------------------------------- |
| `path`   | Directory to clean (defaults to current working directory) |

### Examples

Clean `node_modules` in the current directory:

```bash
bun-sweep
```

Preview what would be deleted (dry-run):

```bash
bun-sweep --dry-run
```

Clean `node_modules` in a specific directory:

```bash
bun-sweep D:\repos\my-project
```

Recursively clean `node_modules` in all subdirectories:

```bash
bun-sweep -r D:\repos\
```

Clean build output folders (`dist`, `out`, `dist-electron`):

```bash
bun-sweep --build-outputs
```

Show help:

```bash
bun-sweep --help
```

## Development

### Install dependencies

```bash
bun install
```

### Run in development mode

```bash
bun run dev
```

### Build

```bash
bun run build
```

### Type check

```bash
bun run typecheck
```

### Lint

```bash
bun run lint
```

### Format

```bash
bun run format
```

## Technologies

- **Runtime**: [Bun](https://bun.com) v1.4.4+
- **Language**: TypeScript (ESNext, strict mode)
- **CLI Dependencies**:
  - [`@involvex/del-cli`](https://www.npmjs.com/package/@involvex/del-cli) - For recursive deletion
  - [`has-flag`](https://www.npmjs.com/package/has-flag) - For parsing CLI flags

## License

MIT
