pragma solidity >=0.4.0 <0.8.0;

contract Rating {
   
    mapping(address => uint) rates;

    mapping(address =>  mapping(address => uint)) users;

    function rateUser(address userToBeRated, uint rate) public {
        address from = msg.sender;
        if(users[userToBeRated][from] > 0) revert();
        users[userToBeRated][from] = rate;
    }
    
    function getMyRateFromUser(address rater) public view returns (uint) {
        address from = msg.sender;
        return users[from][rater];
    }
    
    function getUserRateFromUser(address ratedUser, address rater) view public returns (uint) {
        return users[ratedUser][rater];
    }
}
