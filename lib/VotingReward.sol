// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VotingReward is ERC1155, Ownable {
    
    constructor() 
        ERC1155("https://api.example.com/metadata/{id}.json") 
        Ownable(msg.sender) 
    {}

    // The function we will call from the UI
    function mint(address account, uint256 id, uint256 amount) public {
        // In a real app, add "onlyVotingContract" check here!
        _mint(account, id, amount, "");
    }
}
