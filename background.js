// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Called when the user clicks on the browser action.

// chrome.browserAction.onClicked.addListener(function(tab) {
// 	chrome.browserAction.setIcon({ path:"icon-on.png" });
//   chrome.tabs.executeScript(null, {file: "content_script.js"})
// });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	 const twitter = /^https:\/\/twitter\.com\/*/;
	 if (twitter.test(changeInfo.url)) {
  	chrome.tabs.executeScript(null, {file: "content_script.js"})
	 }
}); 

