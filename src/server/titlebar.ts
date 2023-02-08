import { Titlebar, Color } from 'custom-electron-titlebar'
if (process.isMainFrame) {
    document.addEventListener('readystatechange', () => {
        if (document.readyState == "interactive") {
            const getTitleBarBgColorHex = () => {
                const bgColorHex = getComputedStyle(document.documentElement).getPropertyValue("--zx-bar-bg-color").trim();
                return Color.fromHex(bgColorHex);
            }
            const titleBar = new Titlebar({
                menu: null,
                titleHorizontalAlignment: "left",
                backgroundColor: getTitleBarBgColorHex()
            });
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.type === "attributes" && mutation.attributeName === "data-bs-theme") {
                        titleBar.updateBackground(getTitleBarBgColorHex());
                    }
                });
            });
            observer.observe(window.top.document.documentElement, {
                attributes: true,
                attributeFilter: ["data-bs-theme"]
            });
        }
    });
}
