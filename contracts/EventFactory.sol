// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./Event.sol";

contract EventFactory {
    address[] public events;

    function createEvent(
        string memory eventTitle,
        string memory eventDescription,
        uint256 availableTickets,
        uint256 price
    ) public {
        Event eventData = new Event(
            eventTitle,
            eventDescription,
            availableTickets,
            price,
            msg.sender
        );
        events.push(address(eventData));
    }

    function getEvents() public view returns (address[] memory) {
        return events;
    }
}
