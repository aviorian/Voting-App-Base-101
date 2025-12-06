// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract SimpleVoting {

    struct Poll {
        string title;
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 creatorFid;
        address creatorAddress; // [NEW] Store wallet address for ownership check
        bool isOpen;
    }

    Poll[] public polls;
    mapping(uint256 => mapping(uint256 => bool)) public hasVoted;

    event PollCreated(uint256 indexed pollId, uint256 indexed creatorFid, string title);
    event Voted(uint256 indexed pollId, uint256 indexed voterFid, bool voteYes);
    event PollClosed(uint256 indexed pollId); // [NEW] Event for closing

    function createPoll(
        string calldata _title, 
        string calldata _description, 
        uint256 _creatorFid
    ) external {
        require(bytes(_title).length > 0, "Title required");

        polls.push(Poll({
            title: _title,
            description: _description,
            yesVotes: 0,
            noVotes: 0,
            creatorFid: _creatorFid,
            creatorAddress: msg.sender, // [NEW] Save who created it
            isOpen: true
        }));

        emit PollCreated(polls.length - 1, _creatorFid, _title);
    }

    function vote(uint256 _pollId, bool _voteYes, uint256 _voterFid) external {
        require(_pollId < polls.length, "Poll does not exist");
        require(!hasVoted[_pollId][_voterFid], "Already voted");

        Poll storage p = polls[_pollId];
        require(p.isOpen, "Poll is closed");

        if (_voteYes) {
            p.yesVotes++;
        } else {
            p.noVotes++;
        }

        hasVoted[_pollId][_voterFid] = true;
        emit Voted(_pollId, _voterFid, _voteYes);
    }

    // [NEW FEATURE] Close Poll
    // Great for teaching "msg.sender" and access control
    function closePoll(uint256 _pollId) external {
        require(_pollId < polls.length, "Poll does not exist");
        
        Poll storage p = polls[_pollId];
        
        // Only the wallet that created the poll can close it
        require(msg.sender == p.creatorAddress, "Only creator can close");
        require(p.isOpen, "Already closed");

        p.isOpen = false;
        emit PollClosed(_pollId);
    }

    // --- Read Functions ---

    function getAllPolls() external view returns (Poll[] memory) {
        return polls;
    }

    /**
     * [NEW HELPER] Batch check for UI
     * Returns an array of booleans corresponding to the poll list.
     * true = User has voted
     * false = User has NOT voted
     */
    function getUserVotedStatus(uint256 _voterFid) external view returns (bool[] memory) {
        bool[] memory status = new bool[](polls.length);
        for (uint256 i = 0; i < polls.length; i++) {
            status[i] = hasVoted[i][_voterFid];
        }
        return status;
    }
}