class TabView {
    constructor() {
        this.tabsElement = $(".tabs");
        this.tabContentElement = $(".tab-content");
    }

    renderTabs(tabs) {
        this.tabsElement.children(".tab").remove(); 
        tabs.forEach((tab) => {
            this.tabsElement.append(this.createTabElement(tab)); 
        });
        this.enableDragAndDrop(); 
    }

    createTabElement(tab) {
        const tabElement = $(`
            <div class="tab" data-tab="${tab.id}">
                ${tab.name}<span class="close-tab">x</span>
            </div>
        `);

        return tabElement;
    }

    setActiveTab(tabId) {
        $(".tab").removeClass("active"); 
        $(`[data-tab="${tabId}"]`).addClass("active"); 
    }

    renderContent(tab) {
        this.tabContentElement.children(".content").remove(); 
        this.tabContentElement.append(this.createContentElement(tab)); 
    }

    createContentElement(tab) {
        return $(`
            <div class="content" data-tab="${tab.id}">
                <iframe src="${tab.content}" frameborder="0" class="content-iframe"></iframe>
            </div>
        `);
    }

    enableDragAndDrop() {
        $(".tabs").sortable({
            axis: "x",
            stop: function (event, ui) {
                const tabOrder = $(this).sortable("toArray", {
                    attribute: "data-tab",
                });
                tabModel.tabs = tabOrder.map((tabId) => tabModel.getTabs().find((t) => t.id === tabId));
                tabModel.saveTabsToLocalStorage(); 
            },
        });
    }
}
