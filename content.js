var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.extension.getURL('style.css');
(document.head||document.documentElement).appendChild(style);

function loadIG(elem) {
  const content = elem.querySelector(".content");
  const container_link = elem.querySelector(".js-tweet-text-container");
  const displayed_url = container_link.querySelectorAll(".twitter-timeline-link");
  let insta_url = null;

  for (let i = 0, c = displayed_url.length; i < c; i++) {
    if (displayed_url[i].innerText && displayed_url[i].innerText.indexOf('instagram.com') !== -1) {
      insta_url = displayed_url[i];
    }
  }
    
  if (insta_url) {

   // retrieve ig link
   const ig = insta_url.getAttribute('data-expanded-url');

    // get img src from ig api
    fetch(`https://api.instagram.com/oembed/?url=${ig}`).then(function(res) {
      if (res.ok && res.status === 200) {
        return res.json();
      }
      throw new Error();
    }).then(function(json) {
      const image_url = json.thumbnail_url;
      const description = json.title;
      const author = json.author_name;
      const future_container = `<div class='igviewer'><hr/><p style='color:#a29e9e'><span style='font-weight:bold'>${author} </span>${description}</p><a href=${ig} target='_blank'><img src=${image_url} alt='ig-card'/></a></div>`
      if (content.childNodes[4].className !== 'igviewer') {
        container_link.insertAdjacentHTML('afterend', future_container)
      }
    }).catch(function(err) {
      const container_err = `<div class='igviewer'><p style='color:#a29e9e'>The image is not available<p></div>`;
      if (content.childNodes[4].className !== 'igviewer') {
        container_link.insertAdjacentHTML('afterend', container_err);
      }
    })
  }
};

// // select the target node
var target = document.getElementById('stream-items-id');
var initial_posts = target.querySelectorAll(".js-stream-item");

//find batch of initial cards
for (let i = 0; i < initial_posts.length; i++) {
  loadIG(initial_posts[i]);
}

// observe mutations on subsequent cards
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    var posts = mutation.addedNodes
    
    for (let i = 0; i < posts.length; i++) {
      loadIG(posts[i]);
    }
  });
});

var config = { attributes: false, childList: true, characterData: false, subtree: false };

observer.observe(target, config);