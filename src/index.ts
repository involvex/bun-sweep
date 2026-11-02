#!/usr/bin/env bun
import {existsSync, readdirSync} from 'fs'
import {isAbsolute, join} from 'path'

import {$} from 'bun'
import hasflag from 'has-flag'

import pkg from '../package.json' with {type: 'json'}

const args = process.argv.slice(2)

// Parse flags
const help =
	hasflag('help') || hasflag('h') || hasflag('-h') || hasflag('--help')
const dryRun = hasflag('--dry-run')
const recursive = hasflag('--recursive') || hasflag('-r')
const buildOutputs = hasflag('--build-outputs')
const version = hasflag('--version') || hasflag('-v')

if (version) {
	console.log('@involvex/bun-sweep version: ', pkg.version)
	process.exit(0)
}
// Positional path argument (first non-flag argument)
const pathArg = args.find(a => !a.startsWith('-'))

const targetDir = pathArg
	? isAbsolute(pathArg)
		? pathArg
		: join(process.cwd(), pathArg)
	: process.cwd()

const actionLabel = dryRun ? 'Would clean' : 'Cleaning'

const deletePaths = async (paths: string[], label: string) => {
	if (dryRun) {
		console.log(`${label}: ${paths.join(', ')}`)
		return
	}
	console.log(`${label}: ${paths.join(', ')}`)
	await $`del-cli ${paths}`
}

const cleanBuildOutputs = async (dir: string) => {
	const folders = ['dist', 'out', 'dist-electron']
	const existing: string[] = []
	for (const folder of folders) {
		const fullPath = join(dir, folder)
		if (existsSync(fullPath)) {
			existing.push(fullPath)
		}
	}
	if (existing.length === 0) {
		console.log(`No build output folders found in ${dir}`)
		return
	}
	await deletePaths(existing, `${actionLabel} build outputs in ${dir}`)
}

const cleanNodeModules = async (dir: string) => {
	const nodeModules = join(dir, 'node_modules')
	if (existsSync(nodeModules)) {
		await deletePaths([nodeModules], `${actionLabel} node_modules in ${dir}`)
	} else {
		console.log(`No node_modules found in ${dir}`)
	}
}

const processDir = async (dir: string) => {
	if (buildOutputs) {
		await cleanBuildOutputs(dir)
	} else {
		await cleanNodeModules(dir)
	}

	if (recursive) {
		try {
			const entries = readdirSync(dir, {withFileTypes: true})
			for (const entry of entries) {
				if (entry.isDirectory() && entry.name !== 'node_modules') {
					await processDir(join(dir, entry.name))
				}
			}
		} catch (e) {
			console.error(`Failed to read directory ${dir}: ${String(e)}`)
		}
	}
}

if (help) {
	console.log('Usage: bun-sweep [options] [path]')
	console.log('')
	console.log('Options:')
	console.log(
		'  -r, --recursive    Recursively clean node_modules in subdirectories',
	)
	console.log(
		'  --dry-run          Preview what would be deleted without deleting',
	)
	console.log(
		'  --build-outputs    Clear dist, out, dist-electron instead of node_modules',
	)
	console.log('  --help, -h         Show this help message')
	console.log('')
	console.log('Examples:')
	console.log(
		'  bun-sweep                    Clean node_modules in current directory',
	)
	console.log('  bun-sweep --dry-run          Preview node_modules cleanup')
	console.log(
		'  bun-sweep D:/repos/          Clean node_modules in specific directory',
	)
	console.log(
		'  bun-sweep -r D:/repos/       Recursively clean node_modules in all subdirs',
	)
	console.log(
		'  bun-sweep --build-outputs    Clean dist, out, dist-electron folders',
	)
	process.exit(0)
}

if (!existsSync(targetDir)) {
	console.log(`Path not found: ${targetDir}`)
	process.exit(1)
}

await processDir(targetDir)
