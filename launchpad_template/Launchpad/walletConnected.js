// walletConnect.js
function connectWallet() {
    if (typeof ethereum !== 'undefined') {
        ethereum.request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                console.log(accounts);
                // Optionally, you can perform additional actions after connecting
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        console.error("Ethereum object not found. Make sure MetaMask is installed. Download the extension and try again!");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const walletConnectButton = document.getElementById('walletConnectButton');

    if (walletConnectButton) {
        walletConnectButton.addEventListener('click', connectWallet);
    }
});