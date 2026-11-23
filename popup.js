async function sayHello() {
    let [tab] = await chrome.tabs.query({ active: true });
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            alert('Hello, extension!');
        }
        });
}
document.getElementById('myButton').addEventListener('click', sayHello);