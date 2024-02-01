    // Function to toggle dark mode
    function toggle() {
      const body = document.body;
      body.classList.toggle('dark-mode');

      // Check if dark mode is enabled and store the preference in local storage
      const isDarkMode = body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
    }

    // Check local storage for dark mode preference on page load
    document.addEventListener('DOMContentLoaded', () => {
      const isDarkMode = localStorage.getItem('darkMode') === 'true';
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
      }
    });





let web3;
let contract;
let account;

var got = false;


const Address = '0x2a60293bbe8f580d348a707f51298bb47dd4707f';

async function connectWeb3() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      
      const response = await fetch('./abi.json'); 
      const abi = await response.json();

      contract = new web3.eth.Contract(abi, Address);
      const accounts = await web3.eth.getAccounts();

      account = accounts[0];

      var last = account.substring(account.length - 4); 

      document.getElementById("connect-button").innerHTML = "Connected to 0x..." + last;


      
      get();

      console.log('Connected to Web3 and contract');
    } catch (error) {
      console.error('Web3 connection error:', error);
    }
  } else {
    console.error('MetaMask is not installed');
  }
}

async function get() {

  if( got == false ) {
    const owned = await contract.methods.balanceOf(account).call();
    const total = await contract.methods.totalSupply().call();
  
    document.getElementById("num").innerHTML = owned;
  
    got = true;
  
    for (let i = 1; i <= total; i++) {
  
      const address = await contract.methods.ownerOf(i).call();
  
      if(address == account){
        var newOne = document.createElement("li");

        const value = await contract.methods.getValue(i).call();

        var textNode = document.createTextNode(`${i} = ${value} .000 eth `);
  
        newOne.appendChild(textNode);
  
        var existingList = document.getElementById("list");
  
        existingList.appendChild(newOne);
  
      }
    }  
  }
}