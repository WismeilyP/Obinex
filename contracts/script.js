var app = new Vue({
  el: '#obinex',
  data: {
    MAX_INT: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    contractTokenPay: "0x2803c135AD2B4f235c7Cbcaab79F55E2B0885d4f",
    contractOF: '0xb4D0bC8A75135b70094a79a28ed312C1C00A333A',
    contractSale: "0x0B1993dc26aA02E9818d7b87B4c9003145fb635e",
    etherumInstall: false,
    loading: true,
    message_error: "",
    message_success: "",
    is_connect: false,
    address: '',
    chainId: 0,
    allowance: false,
    chainIdPermit: [
      {
        chainId: 11155111,
        ether: {
          symbol: "ETH"
        },
        node: "https://rpc.sepolia.org"
      }
    ],
    indexChainId: 0,
    statusPermit: true,
    nodeRPC: '',
    balanceEther: 0,
    balanceUSDT: 0,
    nft1: 1,
    nft2: 1,
    nft3: 1
  },
  created() {
    const container = document.getElementById('button_container')
    container.style.display = 'initial'
  },
  mounted: async function () {
    const $this = this;

    if(window.ethereum != undefined){
      this.etherumInstall = true;
      window.ethereum.on('networkChanged', async function (chainId) {
        await $this.networkChanged(chainId)
      })

      window.ethereum.on('accountsChanged', async function () {
        await $this.accountsChanged()
      })
    }

    this.check();
  },
  updated: function () {

  },
  methods: {
    showSuccessMessage(text) {
      this.message_success = text;
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000);
    },
    async check() {
      this.loading = true;
      try{
        if(this.etherumInstall){
          const [isConnect, address] = await this.isConnect()
          this.is_connect = isConnect;
          this.address = address;

          if(isConnect){
            const web3 = new Web3(window.ethereum);
            this.chainId = this.is_connect ? await web3.eth.getChainId() : 0
            const [permit, node, index] = this.networkPermit(this.chainId);
            this.indexChainId = index;
            this.statusPermit = permit;
            this.nodeRPC = node;
            this.balanceEther = await this.getETHBalance(address)
            this.balanceUSDT = await this.balanceOfTokenId(address, this.contractTokenPay)
            const allowance = await this.onAllowance()
            this.allowance = allowance != 0
          }
        }

        this.loading = false;
      }
      catch (e) {
        this.loading = false;
      }
    },
    async isConnect() {
      try{
        const isC = await window.ethereum.request({method: 'eth_accounts'})
        return [isC.length > 0, isC[0]]
      }
      finally{
        this.loading = false;
      }
    },
    async connect() {
      try {
        await window.ethereum.enable();
        await this.check();
      }
      catch {
      }
    },
    async networkChanged(chainId) {
      this.chainId = chainId;
      await this.check();
    },
    async accountsChanged() {
      await this.check();
    },
    networkPermit(chainId) {
      const permits = this.chainIdPermit;
      for (index in permits)
        if (chainId == permits[index]['chainId'])
          return [true, permits[index]['node'], index]
      return [false, '', 0]
    },
    async changeNetwork() {
      // Crear una instancia de web3 utilizando el proveedor de MetaMask
      const web3 = new Web3(window.ethereum);

      // Solicitar acceso a la cuenta de MetaMask
      const num = this.chainIdPermit[0]['chainId'];
      const hex = "0x" + Number(num).toString(16)
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{chainId: hex}] // Cambiar al ID de red de Ropsten
        })
        await this.check();
      }
      catch {

      }
    },
    async loadAbi(name) {
      const data = await fetch(window.location.href + 'contracts/abis/' + name + ".json");
      return await data.json()
    },
    async executeMethod(method, parameters) {
      return method.call(parameters)
        .then(() => {
          return method;
        })
        .catch((e) => {
          let message = e.message;
          if (message.includes('message')) {
            if (e.message.includes('execution reverted')) {
              try {
                message = e.message.split('"execution reverted:')[1].split('"')[0];
              }
              catch (r) {
                try {
                  message = e.message.split('"message": "')[1].split('"')[0];
                }
                catch (e) {
                  message = "Undetermined error."
                }
              }
              throw new Error(message);
            }
            else
              throw new Error(message);
          }
          else {
            throw new Error(message);
          }

        })
    },
    async getETHBalance(address) {
      const web3 = new Web3(window.ethereum);
      const balance = await web3.eth.getBalance(address);
      return web3.utils.fromWei(balance, 'ether');
    },
    async balanceOfTokenId(address, contract_address) {
      const erc20Abi = await this.loadAbi("abi")
      const web3 = new Web3(Web3.givenProvider)
      const contract = new web3.eth.Contract(erc20Abi, contract_address)
      const balance = await contract.methods.balanceOf(address).call()
      return web3.utils.fromWei(balance, 'ether');
    },
    async onAllowance() {
      const erc20Abi = await this.loadAbi("abi")
      const web3 = new Web3(Web3.givenProvider)
      const contract = new web3.eth.Contract(erc20Abi, this.contractTokenPay)
      const allowance = await contract.methods.allowance(this.address, this.contractSale).call()
      return allowance
    },
    async onApprove(spender, value) {
      this.message_error = ''
      this.loading = true;
      const erc20Abi = await this.loadAbi("abi")
      const web3 = new Web3(Web3.givenProvider)
      const contract = new web3.eth.Contract(erc20Abi, this.contractTokenPay)
      try {
        const method = await this.executeMethod(contract.methods.approve(this.contractSale, value), {from: this.address})
        const tx = await method.send({from: this.address})
        this.check()
      }
      catch (e) {
        if ('message'.includes(e)) {
          this.message_error = e;
        }
        else {
          this.message_error = e.message
        }
      }
      finally {
        this.loading = false;
      }
    },
    async purchase() {
      this.message_error = ''
      this.loading = true;
      const allowance = await this.onAllowance()
      if (allowance == 0) {
        this.onApprove(this.spender, this.MAX_INT)
      }
      else {
        const ids = [];
        const amounts = [];
        if (this.nft1 != 0) {
          ids.push(1);
          amounts.push(this.nft1)
        }
        if (this.nft2 != 0) {
          ids.push(2);
          amounts.push(this.nft2)
        }
        if (this.nft3 != 0) {
          ids.push(3);
          amounts.push(this.nft3)
        }

        const purchaseABI = await this.loadAbi("abi");
        const web3 = new Web3(Web3.givenProvider)
        const contract = new web3.eth.Contract(purchaseABI, this.contractSale)
        try {
          const method = await this.executeMethod(contract.methods.publicSale(ids, amounts), {from: this.address})
          const tx = await method.send({from: this.address})
          this.showSuccessMessage("The purchase has been successfully completed")
        }
        catch (e) {
          if ('message'.includes(e)) {
            this.message_error = e;
          }
          else {
            this.message_error = e.message
          }
        }
        finally {
          this.loading = false;
        }
      }
    }
  }
})
