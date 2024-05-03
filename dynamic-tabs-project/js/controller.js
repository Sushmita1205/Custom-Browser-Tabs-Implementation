$(document).ready(function () {
    const tabModel = new TabModel();
    const tabView = new TabView();

    // Function to add a new tab when the "+" button is clicked
    $("#add-tab").on("click", function () {
        const newTab = tabModel.addTab(); // Create a new tab in the model
        tabModel.setCurrentTabId(newTab.id); // Set the new tab as current
        tabView.renderTabs(tabModel.getTabs()); // Re-render the tabs
        tabView.setActiveTab(newTab.id); // Make the new tab active
        tabView.renderContent(newTab); // Render content for the new tab
    });

    // Handle tab switching
    $(document).on("click", ".tab", function () {
        const tabId = $(this).data("tab");
        tabModel.setCurrentTabId(tabId); // Set the current tab ID
        tabView.setActiveTab(tabId); // Highlight the current tab
        tabView.renderContent(tabModel.getCurrentTab()); // Render content for the current tab
    });

    // Handle tab closing
    $(document).on("click", ".close-tab", function (e) {
        const tabId = $(this).parent().data("tab");
        tabModel.removeTab(tabId); // Remove the tab
        tabView.renderTabs(tabModel.getTabs()); // Re-render the tabs

        if (tabModel.getTabs().length > 0) {
            tabModel.setCurrentTabId(tabModel.getTabs()[0].id); 
            tabView.setActiveTab(tabModel.getCurrentTabId()); 
            tabView.renderContent(tabModel.getCurrentTab()); 
        }

        e.stopPropagation(); 
    });

    // Handle search functionality
    $("#search-button").on("click", function () {
        const engine = $("#search-engine").val();
        const query = $("#search-input").val();
        if (query.trim() !== "") {
            const searchURL = `${engine}${encodeURIComponent(query)}`; 
            const currentTab = tabModel.getCurrentTab();
            if (currentTab) {
                currentTab.content = searchURL; 
                tabView.renderContent(currentTab); 
            }
        }
    });

    $("#search-input").on("keypress", function (e) {
        if (e.which === 13) {
            $("#search-button").click(); // Trigger search on "Enter"
        }
    });

    // Navigation for tab scrolling
    $("#navigate-left").on("click", function () {
        const tabContainer = $("#tab-container");
        tabContainer.scrollLeft(tabContainer.scrollLeft() - 100); 
    });

    $("#navigate-right").on("click", function () {
        const tabContainer = $("#tab-container");
        tabContainer.scrollLeft(tabContainer.scrollLeft() + 100); 
    });

    // Ensure a default tab is opened when the page loads
    if (tabModel.getTabs().length === 0) {
        $("#add-tab").click(); // Add the first tab
    } else {
        const currentTabId = tabModel.getCurrentTabId() || tabModel.getTabs()[0].id;
        tabModel.setCurrentTabId(currentTabId); 
        tabView.setActiveTab(currentTabId); 
        tabView.renderContent(tabModel.getCurrentTab()); 
    }
});
