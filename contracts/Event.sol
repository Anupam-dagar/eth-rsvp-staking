// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Event is AccessControl, Ownable {
    using Counters for Counters.Counter;

    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER");

    struct Ticket {
        Counters.Counter sold;
        uint256 totalTickets;
        uint256 ticketPrice;
    }
    Ticket public ticket;
    mapping(address => bool) public participantToEvent;
    mapping(address => bool) public participantRsvp;
    string public title;
    string public description;

    modifier onlyManager(address sender) {
        require(
            hasRole(MANAGER_ROLE, msg.sender),
            "Only manager can add managers."
        );
        _;
    }

    constructor(
        string memory eventTitle,
        string memory eventDescription,
        uint256 availableTickets,
        uint256 price,
        address owner
    ) {
        title = eventTitle;
        description = eventDescription;
        Counters.Counter memory current;
        ticket = Ticket({
            sold: current,
            totalTickets: availableTickets,
            ticketPrice: price
        });
        transferOwnership(owner);
        _setupRole(MANAGER_ROLE, msg.sender);
    }

    function buyTicket() public payable {
        require(ticket.sold.current() < ticket.totalTickets, "Event sold out.");
        require(msg.value == ticket.ticketPrice, "Insufficient ether sent.");
        require(
            participantToEvent[msg.sender] != true,
            "Participant already registered."
        );
        participantToEvent[msg.sender] = true;
        ticket.sold.increment();
    }

    function addManager(address manager) public onlyManager(msg.sender) {
        _setupRole(MANAGER_ROLE, manager);
    }

    function rsvpParticipant(address payable participant)
        public
        onlyManager(msg.sender)
    {
        require(
            participantToEvent[participant] == true,
            "Participant not registered."
        );
        participantRsvp[participant] = true;
        uint256 participantStake = ticket.ticketPrice -
            ((ticket.ticketPrice / 100) * 1);
        participant.transfer(participantStake);
    }

    function withdrawFunds() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function getEventData()
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            title,
            description,
            ticket.sold.current(),
            ticket.totalTickets,
            ticket.ticketPrice
        );
    }
}
