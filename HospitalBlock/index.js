web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"patientRecorded","outputs":[{"name":"numberRecord","type":"uint256"},{"name":"firstNamePatient","type":"string"},{"name":"lastNamePatient","type":"string"},{"name":"isValue","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"insuranceID","type":"uint256"}],"name":"getPatientFirstName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"insuranceID","type":"uint256"},{"name":"firstPatientName","type":"string"},{"name":"lastPatientName","type":"string"}],"name":"addPatientRecord","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"insuranceID","type":"uint256"}],"name":"getPatientMedicalHistoryHash","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"insuranceID","type":"uint256"},{"name":"firstPatientName","type":"string"},{"name":"lastPatientName","type":"string"},{"name":"ipfsKey","type":"bytes32"},{"name":"ipfsKeyExtension","type":"bytes32"}],"name":"addPatientRecord2","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"insuranceID","type":"uint256"}],"name":"getPatientValue","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"insuranceID","type":"uint256"},{"name":"firstPatientName","type":"string"},{"name":"lastPatientName","type":"string"}],"name":"addEmptyPatient","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"insuranceID","type":"uint256"}],"name":"getPatientMedicalHistoryExtension","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"insuranceID","type":"uint256"}],"name":"getPatientLastName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"insuranceID","type":"uint256"}],"name":"getPatientNumberRecord","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]',)

patientHospital = web3.eth.contract(abi);
//contractInstance = patientHospital.at('0x71a5aeb3bfff589239054fda8a69ff1732949179');
contractInstance = patientHospital.at('0xbce91a8315d1abc15e032408e5f1afc8e632c65f');

nameFPatient = $("#patientFName").val();
nameLPatient = $("#patientLName").val();
insurancePatient = $("#insuranceID").val();


function addPatientRecord()
{
        nameFPatient = $("#patientFName").val();
        nameLPatient = $("#patientLName").val();
        insurancePatient = $("#insuranceID").val();
        contractInstance.addEmptyPatient(insurancePatient, nameFPatient,nameLPatient,{from: web3.eth.accounts[0], gas: 4700000});//,
        //function() { 
        //        let name = contractInstance.getPatientFirstName.call(insurancePatient);
        //        $("p").html(name);
        //});

}

function getPatientInfo()
{
        insurancePatient = $("#insuranceID").val();
        console.log(insurancePatient);
        block_to_insert = document.createElement( 'div' );
        container_block = document.getElementById( 'demoHistory' );
        let firstName = contractInstance.getPatientFirstName.call(insurancePatient);
        let lastName = contractInstance.getPatientLastName.call(insurancePatient);
        
        block_to_insert.innerHTML = "Patient:" + " " + firstName + "  " + lastName;
        container_block.appendChild( block_to_insert );
        console.log(name)
        
        // Now Hashes
        
      ipfsId = Object.keys(contractInstance.getPatientMedicalHistoryHash(insurancePatient));
                //let name = contractInstance.getPatientFirstName.call(1);

                
               // for (var i = 0; i < ipfsId.length; i++) {
                //let fileIpfsName = ipfsId[i];
              
                //}

        for (var i = 0; i < ipfsId.length; i++) {
                var btn = document.createElement("button");
                let fileIpfsName = ipfsId[i];
                btn.innerHTML = ipfsId[i];
                btn.onclick = function(){
                alert('here be dragons');return false;
                };
                container_block.appendChild(btn);
        }

};
        
function getPatientFirstName()
{
        insurancePatient = $("#insuranceID").val();
        console.log(insurancePatient);
        block_to_insert = document.createElement( 'div' );
        container_block = document.getElementById( 'demoHistory' );
        let name = contractInstance.getPatientFirstName.call(insurancePatient);
        block_to_insert.innerHTML = name;
        container_block.appendChild( block_to_insert );
        console.log(name)
        //$("p").html(name);
}

function getPatientlastName()
{
        insurancePatient = $("#insuranceID").val();
        console.log(insurancePatient);
        block_to_insert = document.createElement( 'div' );
        container_block = document.getElementById( 'demoHistory' );
        let name = contractInstance.getPatientLastName.call(insurancePatient);
        block_to_insert.innerHTML = name;
        container_block.appendChild( block_to_insert );
        console.log(name)
        //$("p").html(name);
}

function getPatientMedicalHistoryHash()
{
      insurancePatient = $("#insuranceID").val();
        
      ipfsId = Object.keys(contractInstance.getPatientMedicalHistoryHash(insurancePatient,{from: web3.eth.accounts[0], gas: 4700000}));
                //let name = contractInstance.getPatientFirstName.call(1);

                
                for (var i = 0; i < ipfsId.length; i++) {
                let fileIpfsName = ipfsId[i];
              
                }
}


$(document).ready(function(){
               ipfsId = Object.keys(contractInstance.getPatientMedicalHistoryHash(insurancePatient,{from: web3.eth.accounts[0], gas: 4700000}));
         
});



