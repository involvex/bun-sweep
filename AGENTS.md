# AGENTS.md

## Project Overview

**bun-sweep** is a CLI tool for cleaning project directories. It provides commands to remove common build output directories and node_modules recursively.

## Useful Commands

### Installation

```bash
bun install
```

### Development

```bash
bun run dev        # Run the CLI in development mode
```

### Building

```bash
bun run build      # Build the CLI to dist/ directory
```

### Type Checking

```bash
bun run typecheck  # Run TypeScript type checking with bun check
```

### Linting & Formatting

```bash
bun run lint       # Run linter on src/
bun run format     # Format code with prettier
```

### CLI Usage

```bash
bun run index.ts # Run directly

bun-sweep # If installed globally
```

```bash
bun-sweep clean # Remove dist, build, out, coverage, .cache
bun-sweep clean:node_modules # Remove node_modules in current directory
bun-sweep clean:node_modules --path <dir> -r # Remove specific directory recursively
bun-sweep --help # Show available commands
```

## Technologies

- **Runtime**: [Bun](https://bun.com) v1.4.4+ (fast all-in-one JavaScript runtime)
- **Language**: TypeScript (ESNext, strict mode)
- **CLI Dependencies**:
  - @involvex/del-cli - For recursive deletion
  - has-flag - For parsing CLI flags
- **Build Target**: Bun (native)
- **Code Quality**:
  - Prettier with @involvex/prettier-config
  - ESLint with TypeScript plugin (type-aware linting enabled)
- **Module System**: ES Modules ("type": "module")

## Best Practices

- **Type Safety**: Uses strict TypeScript configuration with additional checks (
  oUncheckedIndexedAccess,
  oImplicitOverride, etc.)
- **Error Handling**: Validates paths exist before attempting deletion operations
- **CLI Design**: Uses flag parsing for flexible command options
- **Cross-platform**: Works on Windows, macOS, and Linux via Bun
- **Clean Output**: Provides informative console messages for user feedback

## Guidelines

- **Code Style**: Follow the Prettier configuration from @involvex/prettier-config - imports are sorted
- **Linting Rules**:
  - qeqeq with smart mode enforced
  -

o-unused-vars is an error

- @typescript-eslint/no-explicit-any is an error
- Type-aware linting is enabled
- **Build Process**: The prebuild script runs format, lint with auto-fix, and typecheck before building
- **File Structure**: Keep source code in src/, built output in dist/
- **Adding Commands**: New commands should be added to the commands object in src/index.ts with async functions
- **Dependencies**: Use Bun as the package manager (see global instructions) - prefer bun add/bun remove
- **Type Checking**: Use bun check (built-in Rust checker) as specified in global instructions
