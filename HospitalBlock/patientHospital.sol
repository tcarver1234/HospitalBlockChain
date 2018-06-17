 pragma solidity 0.4.24;
 
 contract patientHospital{
    
    struct patientMedicalRecordsStruct{
        //number of files
        uint numberRecord;
        //array of ipfscodes
        bytes32[] ipfsPRecordKeys;
        //fileExtension
        bytes32[] ipfsExtension;
        //name
        string firstNamePatient;
        string lastNamePatient;
        //check if new
        bool isValue;
    }
    
    mapping (uint=>patientMedicalRecordsStruct) public patientRecorded;
    
    function addEmptyPatient(uint insuranceID, string firstPatientName, string lastPatientName) public{
        patientRecorded[insuranceID].numberRecord=0;
        patientRecorded[insuranceID].firstNamePatient     = firstPatientName;
        patientRecorded[insuranceID].lastNamePatient      = lastPatientName;
        patientRecorded[insuranceID].isValue=true;
    }
    
    function addPatientRecord(uint insuranceID, string firstPatientName, string lastPatientName) public{
        if(patientRecorded[insuranceID].isValue){
                addEmptyPatient(insuranceID, firstPatientName, lastPatientName);
        }
    }  
    
    function addPatientRecord2(uint insuranceID, string firstPatientName, string lastPatientName, bytes32 ipfsKey,bytes32 ipfsKeyExtension) public{
        if(patientRecorded[insuranceID].isValue){
                addEmptyPatient(insuranceID,firstPatientName,lastPatientName);
        }
        patientRecorded[insuranceID].numberRecord =patientRecorded[insuranceID].numberRecord+1;
        (patientRecorded[insuranceID].ipfsPRecordKeys).push(ipfsKey);
        (patientRecorded[insuranceID].ipfsExtension).push(ipfsKeyExtension); 
    } 
    
    function getPatientNumberRecord(uint insuranceID) view public returns (uint){
        return patientRecorded[insuranceID].numberRecord;
    }  
    function getPatientValue(uint insuranceID) view public returns (bool){
        return patientRecorded[insuranceID].isValue;
    } 
    function getPatientFirstName(uint insuranceID) view public returns (string){
        return patientRecorded[insuranceID].firstNamePatient;
    }
     function getPatientLastName(uint insuranceID) view public returns (string){
        return patientRecorded[insuranceID].lastNamePatient;
    } 
    function getPatientMedicalHistoryHash(uint insuranceID) view public returns (bytes32[]){
        return patientRecorded[insuranceID].ipfsPRecordKeys;
    }  
    function getPatientMedicalHistoryExtension(uint insuranceID) view public returns (bytes32[]){
        return patientRecorded[insuranceID].ipfsExtension;
    }  
 }