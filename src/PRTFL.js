const loadJSON = (callback) => {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'PRTFL.json', true);
    // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = () => {
        if (xobj.readyState === 4 && xobj.status === "200") {
            // Required use of an anonymous callback
            // as .open() will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

let PRTFL = {
    cfg: {
        containerId: "PRTFL",
        globalClassName: "prtfl",
        imageRepository: "./img",
        layout: "default",
        items: [
            {
                title: "Item1",
                description: "description",
                image: "test_black.png", //
                tags: ["A","B"],
                date: "ISODATE",
                details: {
                    link: "" // net link (in iframe) ABER AUCH YOUTUBE DENKBAR
                }
            },
            {
                title: "Item2",
                description: "description",
                image: "test_white.png", //
                tags: ["A","B"],
                date: "ISODATE",
                details: {
                    link: "" // net link (in iframe) ABER AUCH YOUTUBE DENKBAR
                }
            },
            {
                title: "Item3",
                description: "description",
                image: "test_black.png", //
                tags: ["A","B"],
                date: "ISODATE",
                details: {
                    link: "" // net link (in iframe) ABER AUCH YOUTUBE DENKBAR
                }
            }]
    },
    init: function () {
        console.log(0)
        var requestURL = './PRTFL.json';
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            var data = request.response;
            console.log(data)
        }
        loadJSON((response) => {
            // Parse JSON string into object
            PRTFL.cfg.items = JSON.parse(response);
            console.log(1)
            console.log(PRTFL.cfg.items);
            let rootElement = rootHTML();
            let items = PRTFL.cfg.items;
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                let itemContainerEl = itemContainerHTML(item);
                itemContainerEl.appendChild(itemTitleHTML(item));
                itemContainerEl.appendChild(itemDescriptionHTML(item));
                itemContainerEl.appendChild(itemImageHTML(item));
                rootElement.appendChild(itemContainerEl);
            }
        });

    }
};


/// HTML CREATION ///
function createHTML(elementName){
    return document.createElement(elementName);
}
function addItemClassName(element, className){
    element.classList.add(PRTFL.cfg.globalClassName);
    element.classList.add(PRTFL.cfg.globalClassName + "_" + className);
}
function rootHTML() {
    let el = document.getElementById(PRTFL.cfg.containerId);
    addItemClassName(el, "root");
    return el;
}
function itemContainerHTML(item){
    let el = createHTML("div");
    addItemClassName(el, "item");
    return el;
}
function itemTitleHTML(item) {
    let el = createHTML("div");
    el.textContent = item.title;
    addItemClassName(el, "title");
    return el;
}
function itemDescriptionHTML(item){
    let el = createHTML("div");
    el.textContent = item.description;
    addItemClassName(el, "description");
    return el;
}
function itemImageHTML(item) {
    let el = createHTML("img");
    el.setAttribute("src", (PRTFL.cfg.imageRepository + "/" + item.image));
    addItemClassName(el, "image");
    return el;
}


PRTFL.init();

