// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Called when the user clicks on the browser action.

var state = 0;

chrome.browserAction.onClicked.addListener(function(tab) {
	if (state == 0) {
		chrome.browserAction.setIcon({ path:"icon-on.png" });
		chrome.tabs.executeScript(null, {file: "content_script.js"})
		return state++;
	}
	state--;
	chrome.browserAction.setIcon({ path:"icon-off.png" });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (state == 1) {
	 const twitter = /^https:\/\/twitter\.com\/*/;
	 if (twitter.test(changeInfo.url)) {
  	chrome.tabs.executeScript(null, {file: "content_script.js"})
	 }
	}
}); 

