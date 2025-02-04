import { MessageAction } from "./types";

const background = () => {
	chrome.contextMenus.create({
		id: "highlight-selection",
		title: "Highlight",
		contexts: ["selection"],
	});

	chrome.contextMenus.create({
		id: "remove-selection",
		title: "Remove Highlight",
		contexts: ["selection"],
	});

	chrome.contextMenus.onClicked.addListener((info, tab) => {
		if (info.menuItemId === "highlight-selection") {
			chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
				chrome.tabs.sendMessage(tabs[0].id!, { action: MessageAction.RENDER_HIGHLIGHTS });
			});
		} else if (info.menuItemId === "remove-selection") {
			chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
				chrome.tabs.sendMessage(tabs[0].id!, { action: MessageAction.REMOVE_HIGHLIGHTS });
			});
		}
	});
};

background();
