#!/usr/bin/env bun
import {existsSync} from 'fs'
import {join} from 'path'

import {$} from 'bun'
import {deleteAsync} from 'del'
import hasflag from 'has-flag'
const args = process.argv.slice(2)
const command = args[0]
// const commandArgs = args.slice(1)
const commands = {
	clean: async () => {
		await deleteAsync(['dist', 'build', 'out', 'coverage', '.cache'])
	},
	'clean:node_modules': async () => {
		if (existsSync(join(process.cwd(), 'node_modules'))) {
			console.log('Removing node_modules...')
			await $`del-cli node_modules`
		} else {
			console.log('No node_modules found.')
		}
	},
}
if (
	hasflag('help') ||
	hasflag('h') ||
	hasflag('-h') ||
	hasflag('--help') ||
	!command
) {
	console.log('Available commands:')
	for (const cmd in commands) {
		console.log(`  ${cmd}`)
	}
	process.exit(0)
}
if (command && command in commands) {
	await commands[command as keyof typeof commands]()
} else {
	console.log(`Unknown command: ${command ?? 'undefined'}`)
	process.exit(1)
}

console.log('Hello via Bun!')
