import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { test } from 'api/webdav';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
	webdavUrl: string;
	webdavAccount: string;
	webdavPassword: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default',
	webdavUrl: '',
	webdavAccount: '',
	webdavPassword: ''
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Webdav Sync', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('This is my webdav sync plugin!!!');
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		// webdav info input
		containerEl.createEl('h2', {text: 'Webdav Information.'});

		// Webdav url
		new Setting(containerEl)
			.setName('Webdav Url')
			.setDesc('Enter the url of your webdav service')
			.addText(text => text
				.setPlaceholder('Enter the url of your webdav service')
				.setValue(this.plugin.settings.webdavUrl)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.webdavUrl = value;
					await this.plugin.saveSettings();
				}));

		// Webdav account
		new Setting(containerEl)
			.setName('Webdav Account')
			.setDesc('Enter the account of your webdav service')
			.addText(text => text
				.setPlaceholder('Enter the account of your webdav service')
				.setValue(this.plugin.settings.webdavAccount)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.webdavAccount = value;
					await this.plugin.saveSettings();
				}));

		// Webdav password
		new Setting(containerEl)
			.setName('Webdav Password')
			.setDesc('Enter the password of your webdav service')
			.addText(text => text
				.setPlaceholder('Enter the account of your webdav service')
				.setValue(this.plugin.settings.webdavPassword)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.webdavPassword = value;
					await this.plugin.saveSettings();
				}));

		// manual sync button
		containerEl.createEl('h2', {text: 'Sync.'});
		
		new Setting(containerEl)
			.setName('Upload')
			.setDesc("Manual upload files")
			.addButton(button => button
				.setButtonText('Upload')
				.onClick(async (value) => {
					console.log("upload button is clicked.");
					new Notice('Upload failed');
					test();
				}));
	}
}
