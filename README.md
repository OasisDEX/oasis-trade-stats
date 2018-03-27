
### Dependencies   
`npm install` - This will install all of the dependencies  
  
### Running  
  
So far it works only with local parity node. Tried with infura nodes but doesn't work for some reason.  
  
TODO: Allow user to provide the address as an argument.  
  
`DEBUG='runtime' NETWORK='private' node index.js`  
  
NETWORK can take following options:  
  
* kovan  
* main  
* private  
  
  
### Examples   
**1.Fetched a trade initiated through Oasis Direct via proxy.**  
  
```
Web3 version: 0.20.6  

Network:  private    
Market Address 0x8cf1cab422a0b6b554077a361f8419cdf122a9f9    
Proxy Factory Address 0x93ffc328d601c4c5e9cc3c8d257e9afdaf5b0ac0  
  
Listening for incoming trades...  
  
Address: 0x25cf21ce1f31fd5fb77490c2160a6ed3ab70c909  
Is Proxy true
```  
  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
  
**2.Fetch a trade initiated through Oasis DEX without using proxy.**  
  
```
Web3 version: 0.20.6  

Network:  private  
Market Address:  0x8cf1cab422a0b6b554077a361f8419cdf122a9f9  
Proxy Factory Address:  0x93ffc328d601c4c5e9cc3c8d257e9afdaf5b0ac0  

Listening for incoming trades...  
Address: 0x6cd4471480e2969b3d696fbd17530e85112f3ff6  
Is Proxy false  
```