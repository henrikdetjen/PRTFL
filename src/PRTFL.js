let PRTFL = {
	
    cfg: {
        previewContainerId: "PRTFL",
		detailsContainerId: "",
        globalClassName: "prtfl",
        imageRepository: "./img",
        layout: "default",
        items: []
    },
	
    init: function () {
        // load json data
		PRTFL.Network.JSONRequest("./PRTFL.json", function(data){
			if (data){
				// render json data
				PRTFL.cfg.items = data.items;
				PRTFL.View.renderPreviewItems(PRTFL.cfg.items);				
			} else {
				console.log("NO DATA");
			}
		});
    },
	
	Network: {
		
		JSONRequest: function(url, callback){
			var request = new XMLHttpRequest();
			request.open('GET', url);
			request.responseType = 'json';
			request.send();
			request.onload = function() {
				callback(request.response);
			}
 		}
		
	},
	
	View: {
		
		getPreviewItemsRoot: function(){
			if (PRTFL.cfg.previewContainerId.length > 0){
				let rootEl = document.getElementById(PRTFL.cfg.previewContainerId);
				//if (!rootEl.className.contains("preview_root"))
				PRTFL.View.addItemClassName(rootEl, "preview_root");
				return rootEl;
			} 
			return document.getElementsByTagName("body")[0];
		},
		
		renderPreviewItems: function(items){
			let rootEl = PRTFL.View.getPreviewItemsRoot();
			let container = document.createElement("div");
			PRTFL.View.addItemClassName(container, "preview_container");
			for (let i = 0; i < items.length; i++) {
				let item = items[i];
				let previewEl = PRTFL.View.PreviewItem(item);
				item.id = PRTFL.cfg.globalClassName + "_item_" + i;
				previewEl.id = PRTFL.cfg.globalClassName + "_item_" + i;
				container.appendChild(previewEl);
			}		
			rootEl.appendChild(container);
		},
		
		renderDetailsItem: function(item){
			let rootEl = PRTFL.View.getDetailsItemRoot();
			rootEl.appendChild(PRTFL.View.DetailsOverlayItem());
			rootEl.appendChild(PRTFL.View.DetailsItem(item));
		},
		
		destroyDetailsItem: function(item){
			let rootEl = PRTFL.View.getDetailsItemRoot();
			let elsToDel = rootEl.getElementsByClassName(PRTFL.cfg.globalClassName + "_details_overlay");
			while(elsToDel.length > 0){
				elsToDel[0].parentNode.removeChild(elsToDel[0]);
			}
			elsToDel = rootEl.getElementsByClassName(PRTFL.cfg.globalClassName + "_details_item");
			while(elsToDel.length > 0){
				elsToDel[0].parentNode.removeChild(elsToDel[0]);
			}
		},
		
		PreviewItem: function(item){
			// container
			let previewEl = document.createElement("div");
			let previewElThumbWrapper = document.createElement("div");
			let previewElThumbOverlay = document.createElement("div");
			let previewElTextWrapper = document.createElement("div");
			PRTFL.View.addItemClassName(previewEl, "preview_item");
			PRTFL.View.addItemClassName(previewElThumbWrapper, "preview_thumbnail");
			PRTFL.View.addItemClassName(previewElThumbOverlay, "preview_thumbnail_overlay");
			PRTFL.View.addItemClassName(previewElTextWrapper, "preview_text_wrapper");
			previewEl.appendChild(previewElThumbWrapper);
			previewEl.appendChild(previewElThumbOverlay);
			previewEl.appendChild(previewElTextWrapper);
			// title
			if (item.preview.title.length > 0){
				let el = document.createElement("div");
				el.innerHTML = "<h2>" + item.preview.title + "</h2>";
				PRTFL.View.addItemClassName(el, "preview_title");
				previewElTextWrapper.appendChild(el);
			}
			// description
			if (item.preview.description.length > 0){
				let el = document.createElement("div");
				el.textContent = item.preview.description;
				PRTFL.View.addItemClassName(el, "preview_description");
				previewElTextWrapper.appendChild(el);
			}
			// thumbnail
			if (item.preview.thumbnail.length > 0){
				previewElThumbWrapper.style.backgroundImage = 
					"url('" + PRTFL.cfg.imageRepository + "/" + item.preview.thumbnail + "')";
			}
			// tags
			/*for (let j = 0; j < item.tags.length; j++) {
				let el = document.createElement("div");
				el.textContent = item.tags[0];
				PRTFL.View.addItemClassName(el, "tile_tag")
				let tag = item.tags[j];
				if (tag.length > 0) itemContainerEl.appendChild(itemTagHTML(item));
			}*/
			
			// time 
			//<i class="material-icons">access_time</i>
			
			// on click
			previewEl.onclick = function(){ PRTFL.View.renderDetailsItem(item); };
			// return result
			return previewEl;
		},
		
		getDetailsItemRoot: function(){
			if (PRTFL.cfg.detailsContainerId.length > 0){
				let rootEl = document.getElementById(PRTFL.cfg.detailsContainerId);
				//if (!rootEl.className.contains("details_root"))
					PRTFL.View.addItemClassName(rootEl, "details_root");
				return rootEl;
			} 
			return document.getElementsByTagName("body")[0];
		},
		
		DetailsOverlayItem: function(){
			let detailsOverlay = document.createElement("div");
			PRTFL.View.addItemClassName(detailsOverlay, "details_overlay");
			detailsOverlay.onclick = function(){ PRTFL.View.destroyDetailsItem(); };
			return detailsOverlay; 
		},
		
		DetailsItem: function(item){
			// container
			let detailsEl = document.createElement("div");
			PRTFL.View.addItemClassName(detailsEl, "details_item");
			// navigation - close
			let closingEl = document.createElement("div");
			closingEl.innerHTML = "<i class=\"material-icons\">close</i>";
			PRTFL.View.addItemClassName(closingEl, "details_navigation_close");
			closingEl.onclick = function(){ PRTFL.View.destroyDetailsItem(); };
			detailsEl.appendChild(closingEl);
			// title
			if (item.details.title.length > 0){
				let el = document.createElement("div");
				el.innerHTML = "<h1>" + item.details.title + "</h1>";
				PRTFL.View.addItemClassName(el, "details_title");
				detailsEl.appendChild(el);
			}
			// content
			if (item.details.content.length > 0){
				item.details.content.forEach(function(contentItem){
					let el = document.createElement("div");
					PRTFL.View.addItemClassName(el, "details_content");
					el.appendChild(PRTFL.View.ContentItemView(contentItem));
					detailsEl.appendChild(el);
				});
			}	
			// return result
			return detailsEl; 
		},
		
		ContentItemView: function(contentItem){
			let contentEl = document.createElement("div");
			let type = contentItem.type;
			switch (type) {
				case "TEXT": { 
					contentEl.textContent = contentItem.value;
					break;
				}
				case "HTML": { 
					contentEl.innerHTML = contentItem.value;
					break;
				}
				case "PICTURE": { 
					contentEl = PRTFL.View.PictureContentItemView(contentItem);
					break;
				}
				case "YOUTUBE": { 
					contentEl = PRTFL.View.YoutubeContentItemView(contentItem);
					break;
				}
				default: break;
			}
			PRTFL.View.addItemClassName(contentEl, "details_content_item");
			PRTFL.View.addItemClassName(contentEl, "details_content_item_" + type);
			return contentEl;
		},
		
		YoutubeContentItemView: function(contentItem){
			let el = document.createElement("div");
			el.innerHTML = "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/" 
							+ contentItem.value + 
							"\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>";
			return el;
		},
		
		
		PictureContentItemView: function(contentItem){			
			let el = document.createElement("div");
			let imgUrls = contentItem.value;
			if (imgUrls.length == 1){
				// single picture
				el.appendChild(PRTFL.View.PictureElement(imgUrls[0]));
			} else if (imgUrls.length > 1) {
				// gallery
				for (let i = 0, l = imgUrls.length; i < l; i++){
					let picEl = PRTFL.View.PictureElement(imgUrls[i]);
					picEl.id = "details_content_item_PICTURE_" + i;
					PRTFL.View.addItemClassName(picEl, "details_content_item_PICTURE_picture");
					if (i != 0) picEl.style.display = "none";
					el.appendChild(picEl);
				}
				// navigation
				let displayedPic = 0;
				let navWrapper = document.createElement("div");
				let navBackEl = document.createElement("div");
				let navForwEl = document.createElement("div");
				let navCounter = document.createElement("div");
				navBackEl.innerHTML = "<i class=\"material-icons\">arrow_back</i>";
				navForwEl.innerHTML = "<i class=\"material-icons\">arrow_forward</i>";
				navCounter.textContent = "1 / "+imgUrls.length;
				PRTFL.View.addItemClassName(navWrapper, "details_content_item_PICTURE_navigate_wrapper");
				PRTFL.View.addItemClassName(navWrapper, "details_content");
				PRTFL.View.addItemClassName(navBackEl, "details_content_item_PICTURE_navigate_back");
				PRTFL.View.addItemClassName(navForwEl, "details_content_item_PICTURE_navigate_forward");
				PRTFL.View.addItemClassName(navCounter, "details_content_item_PICTURE_navigate_counter");
				navBackEl.onclick = function(){ if(displayedPic > 0) displayPic("details_content_item_PICTURE_"+(--displayedPic)) };
				navForwEl.onclick = function(){ if(displayedPic < imgUrls.length-1) displayPic("details_content_item_PICTURE_"+(++displayedPic)) };
				navWrapper.appendChild(navBackEl);
				navWrapper.appendChild(navCounter);
				navWrapper.appendChild(navForwEl);
				el.appendChild(navWrapper);
				function displayPic(id){
					let elsToHide = document.getElementsByClassName(PRTFL.cfg.globalClassName + "_details_content_item_PICTURE_picture");
					for (let i = 0, l = elsToHide.length; i < l; i++){
						elsToHide[i].style.display = "none";
					}
					document.getElementById(id).style.display = "";
					navCounter.textContent = (displayedPic+1) + " / " + imgUrls.length;
				}
			}
			return el;
		},
		
		PictureElement(url){
			let picEl = document.createElement("img");
			picEl.setAttribute("src", (PRTFL.cfg.imageRepository + "/" + url));
			PRTFL.View.addItemClassName(picEl, "picture");
			return picEl;
		},
		
		addItemClassName(element, className){
			element.classList.add(PRTFL.cfg.globalClassName);
			element.classList.add(PRTFL.cfg.globalClassName + "_" + className);
		}
	
	}
};

PRTFL.init();

