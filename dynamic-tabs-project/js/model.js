class TabModel {
    constructor() {
        this.tabs = [];
        this.currentTabId = null;
        this.loadTabsFromLocalStorage(); // Load tabs from local storage
    }

    addTab(name = null) {
        const tabName = name || `Tab ${this.tabs.length + 1}`; // Default tab name
        const newTab = {
            id: `tab${this.tabs.length + 1}`,
            name: tabName,
            content: '',
        };
        this.tabs.push(newTab); // Add the new tab to the model
        this.saveTabsToLocalStorage(); // Save the updated tabs list
        return newTab; // Return the new tab
    }

    getTabs() {
        return this.tabs;
    }

    setCurrentTabId(id) {
        this.currentTabId = id; 
        this.saveTabsToLocalStorage(); 
    }

    getCurrentTabId() {
        return this.currentTabId;
    }

    getCurrentTab() {
        return this.tabs.find((tab) => tab.id === this.currentTabId);
    }

    removeTab(id) {
        this.tabs = this.tabs.filter((tab) => tab.id !== id);
        this.saveTabsToLocalStorage(); 
    }

    loadTabsFromLocalStorage() {
        const storedTabs = JSON.parse(localStorage.getItem("tabs"));
        if (storedTabs) {
            this.tabs = storedTabs;
        }
    }

    saveTabsToLocalStorage() {
        localStorage.setItem("tabs", JSON.stringify(this.tabs));
    }
}
