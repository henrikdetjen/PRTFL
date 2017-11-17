var PRTFL = {
    cfg: {
        containerId: "PRTFL",
        imageRepository: "./img",
        layout: "default",
        style: "default",
        items: [
            {
                title: "Item1",
                description: "description",
                image: "test.png", //
                details: {
                    link: "" // net link (in iframe) ABER AUCH YOUTUBE DENKBAR
                }
            }]
    },
    init: function () {
        let containerEl = document.getElementById(PRTFL.cfg.containerId);
        let items = PRTFL.cfg.items;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let prtflItemEl = document.createElement("div");
            prtflItemEl.classList.add("prtfl_el_item");
            prtflItemEl.classList.add("prtfl_layout_" + PRTFL.cfg.layout);
            prtflItemEl.classList.add("prtfl_style_" + PRTFL.cfg.style);
            let prtflPicEl = document.createElement("img");
            prtflPicEl.classList.add("prtfl_el_img");
            prtflPicEl.setAttribute("src", (PRTFL.cfg.imageRepository + item.image));
            let prtflTitleEl = document.createElement("div");
            prtflTitleEl.classList.add("prtfl_el_title");
            prtflTitleEl.textContent = item.title;
            let prtflDescriptionEl = document.createElement("div");
            prtflDescriptionEl.classList.add("prtfl_el_description");
            prtflDescriptionEl.textContent = item.description;
            prtflItemEl.appendChild(prtflTitleEl);
            prtflItemEl.appendChild(prtflDescriptionEl);
            prtflItemEl.appendChild(prtflPicEl);
            containerEl.appendChild(prtflItemEl);
        }
    }
};

PRTFL.init();
