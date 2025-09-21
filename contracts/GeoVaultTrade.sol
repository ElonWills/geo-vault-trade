// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhevm/lib/Reencrypt.sol";
import "@fhevm/lib/Fhe.sol";

contract GeoVaultTrade {
    using Fhe for euint32;
    using Fhe for ebool;
    
    struct MiningRights {
        euint32 rightsId;
        euint32 areaSize; // in hectares
        euint32 estimatedValue; // in wei
        euint32 currentBid;
        euint32 bidCount;
        ebool isActive;
        ebool isVerified;
        string location;
        string geologicalData;
        address owner;
        uint256 auctionEndTime;
    }
    
    struct Bid {
        euint32 bidId;
        euint32 amount;
        ebool isAnonymous;
        address bidder;
        uint256 timestamp;
    }
    
    struct GeologicalReport {
        euint32 reportId;
        euint32 mineralContent; // percentage
        euint32 extractionDifficulty; // 1-10 scale
        euint32 environmentalImpact; // 1-10 scale
        ebool isVerified;
        string reportHash;
        address geologist;
        uint256 timestamp;
    }
    
    mapping(uint256 => MiningRights) public miningRights;
    mapping(uint256 => Bid) public bids;
    mapping(uint256 => GeologicalReport) public geologicalReports;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public geologistReputation;
    
    uint256 public rightsCounter;
    uint256 public bidCounter;
    uint256 public reportCounter;
    
    address public owner;
    address public verifier;
    address public geologistVerifier;
    
    event MiningRightsCreated(uint256 indexed rightsId, address indexed owner, string location);
    event BidPlaced(uint256 indexed bidId, uint256 indexed rightsId, address indexed bidder, uint32 amount);
    event GeologicalReportSubmitted(uint256 indexed reportId, uint256 indexed rightsId, address indexed geologist);
    event RightsVerified(uint256 indexed rightsId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    event RightsTransferred(uint256 indexed rightsId, address indexed from, address indexed to);
    
    constructor(address _verifier, address _geologistVerifier) {
        owner = msg.sender;
        verifier = _verifier;
        geologistVerifier = _geologistVerifier;
    }
    
    function createMiningRights(
        string memory _location,
        string memory _geologicalData,
        euint32 _areaSize,
        euint32 _estimatedValue,
        uint256 _auctionDuration
    ) public returns (uint256) {
        require(bytes(_location).length > 0, "Location cannot be empty");
        require(_auctionDuration > 0, "Auction duration must be positive");
        
        uint256 rightsId = rightsCounter++;
        
        miningRights[rightsId] = MiningRights({
            rightsId: _estimatedValue, // Will be set properly
            areaSize: _areaSize,
            estimatedValue: _estimatedValue,
            currentBid: Fhe.asEuint32(0),
            bidCount: Fhe.asEuint32(0),
            isActive: Fhe.asEbool(true),
            isVerified: Fhe.asEbool(false),
            location: _location,
            geologicalData: _geologicalData,
            owner: msg.sender,
            auctionEndTime: block.timestamp + _auctionDuration
        });
        
        emit MiningRightsCreated(rightsId, msg.sender, _location);
        return rightsId;
    }
    
    function placeBid(
        uint256 rightsId,
        euint32 amount,
        ebool isAnonymous
    ) public payable returns (uint256) {
        require(miningRights[rightsId].owner != address(0), "Mining rights do not exist");
        require(Fhe.decrypt(miningRights[rightsId].isActive), "Auction is not active");
        require(block.timestamp <= miningRights[rightsId].auctionEndTime, "Auction has ended");
        require(msg.value >= Fhe.decrypt(amount), "Insufficient payment");
        
        uint256 bidId = bidCounter++;
        
        bids[bidId] = Bid({
            bidId: amount, // Will be set properly
            amount: amount,
            isAnonymous: isAnonymous,
            bidder: isAnonymous ? address(0) : msg.sender,
            timestamp: block.timestamp
        });
        
        // Update mining rights
        miningRights[rightsId].currentBid = amount;
        miningRights[rightsId].bidCount = miningRights[rightsId].bidCount + Fhe.asEuint32(1);
        
        emit BidPlaced(bidId, rightsId, msg.sender, Fhe.decrypt(amount));
        return bidId;
    }
    
    function submitGeologicalReport(
        uint256 rightsId,
        euint32 mineralContent,
        euint32 extractionDifficulty,
        euint32 environmentalImpact,
        string memory reportHash
    ) public returns (uint256) {
        require(miningRights[rightsId].owner != address(0), "Mining rights do not exist");
        require(Fhe.decrypt(miningRights[rightsId].isActive), "Auction must be active");
        
        uint256 reportId = reportCounter++;
        
        geologicalReports[reportId] = GeologicalReport({
            reportId: mineralContent, // Will be set properly
            mineralContent: mineralContent,
            extractionDifficulty: extractionDifficulty,
            environmentalImpact: environmentalImpact,
            isVerified: Fhe.asEbool(false),
            reportHash: reportHash,
            geologist: msg.sender,
            timestamp: block.timestamp
        });
        
        emit GeologicalReportSubmitted(reportId, rightsId, msg.sender);
        return reportId;
    }
    
    function verifyMiningRights(uint256 rightsId, ebool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify mining rights");
        require(miningRights[rightsId].owner != address(0), "Mining rights do not exist");
        
        miningRights[rightsId].isVerified = isVerified;
        emit RightsVerified(rightsId, Fhe.decrypt(isVerified));
    }
    
    function verifyGeologicalReport(uint256 reportId, ebool isVerified) public {
        require(msg.sender == geologistVerifier, "Only geologist verifier can verify reports");
        require(geologicalReports[reportId].geologist != address(0), "Report does not exist");
        
        geologicalReports[reportId].isVerified = isVerified;
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier || msg.sender == geologistVerifier, "Only verifiers can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is geologist based on context
        if (geologicalReports[reportCounter - 1].geologist == user) {
            geologistReputation[user] = reputation;
        } else {
            userReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, Fhe.decrypt(reputation));
    }
    
    function getMiningRightsInfo(uint256 rightsId) public view returns (
        string memory location,
        string memory geologicalData,
        uint32 areaSize,
        uint32 estimatedValue,
        uint32 currentBid,
        uint32 bidCount,
        bool isActive,
        bool isVerified,
        address owner,
        uint256 auctionEndTime
    ) {
        MiningRights storage rights = miningRights[rightsId];
        return (
            rights.location,
            rights.geologicalData,
            Fhe.decrypt(rights.areaSize),
            Fhe.decrypt(rights.estimatedValue),
            Fhe.decrypt(rights.currentBid),
            Fhe.decrypt(rights.bidCount),
            Fhe.decrypt(rights.isActive),
            Fhe.decrypt(rights.isVerified),
            rights.owner,
            rights.auctionEndTime
        );
    }
    
    function getBidInfo(uint256 bidId) public view returns (
        uint32 amount,
        bool isAnonymous,
        address bidder,
        uint256 timestamp
    ) {
        Bid storage bid = bids[bidId];
        return (
            Fhe.decrypt(bid.amount),
            Fhe.decrypt(bid.isAnonymous),
            bid.bidder,
            bid.timestamp
        );
    }
    
    function getGeologicalReportInfo(uint256 reportId) public view returns (
        uint32 mineralContent,
        uint32 extractionDifficulty,
        uint32 environmentalImpact,
        bool isVerified,
        string memory reportHash,
        address geologist,
        uint256 timestamp
    ) {
        GeologicalReport storage report = geologicalReports[reportId];
        return (
            Fhe.decrypt(report.mineralContent),
            Fhe.decrypt(report.extractionDifficulty),
            Fhe.decrypt(report.environmentalImpact),
            Fhe.decrypt(report.isVerified),
            report.reportHash,
            report.geologist,
            report.timestamp
        );
    }
    
    function getUserReputation(address user) public view returns (uint32) {
        return Fhe.decrypt(userReputation[user]);
    }
    
    function getGeologistReputation(address geologist) public view returns (uint32) {
        return Fhe.decrypt(geologistReputation[geologist]);
    }
    
    function finalizeAuction(uint256 rightsId) public {
        require(miningRights[rightsId].owner == msg.sender, "Only owner can finalize");
        require(block.timestamp > miningRights[rightsId].auctionEndTime, "Auction has not ended");
        require(Fhe.decrypt(miningRights[rightsId].isActive), "Auction is not active");
        
        // Transfer rights to highest bidder
        address highestBidder = bids[bidCounter - 1].bidder;
        if (highestBidder != address(0)) {
            miningRights[rightsId].owner = highestBidder;
            emit RightsTransferred(rightsId, miningRights[rightsId].owner, highestBidder);
        }
        
        miningRights[rightsId].isActive = Fhe.asEbool(false);
    }
    
    function withdrawBid(uint256 bidId) public {
        require(bids[bidId].bidder == msg.sender, "Only bidder can withdraw");
        require(block.timestamp > miningRights[rightsId].auctionEndTime, "Auction has not ended");
        
        uint256 amount = Fhe.decrypt(bids[bidId].amount);
        bids[bidId].bidder = address(0);
        
        payable(msg.sender).transfer(amount);
    }
}
