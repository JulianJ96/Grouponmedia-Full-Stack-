// Function to check password security
let checkPassword = function(inputtxt) {


    // Password more than 6 and less than 20 characters
    var passw = /^(.{6,20})/g;
    // Password must contain a number
    var passw1 = /^(?=.*\d)/g;
    // Password must contain at least 1 lower letter
    var passw2 = /^(?=.*[a-z])/g;
    // Password must contain at least 1 capital letter
    var passw3 = /^(?=.*[A-Z])/g;

    var arr = {conditional : false, message: "Your password must have "};
    const coincidence = inputtxt.match(passw);
    const coincidence1 = inputtxt.match(passw1);
    const coincidence2 = inputtxt.match(passw2);
    const coincidence3 = inputtxt.match(passw3);

    if(coincidence && coincidence1 && coincidence2 && coincidence3) {
        arr.conditional = true;
        arr.message = "";
        return arr;
    }
    if (!coincidence){
        arr.message += "more than 6 and less than 20 characters";
    }
    if(!coincidence1){
        arr.message += "contain at least a number";
    }
    if(!coincidence2){
        arr.message += "1 lower letter";
    }
    if(!coincidence3){
        arr.message += "1 capital letter";
    }
    return arr;
}

// Funciton to modify array of likes or dislikes
let modifyArray = function(usersArray,userId,option) {
  
    if(usersArray.length != 0){
        for (i = 0 ; i < usersArray.length ; i++ ){
            if (option === 'Delete'){
                if (usersArray[i] === userId){
                let index = i;
                usersArray.splice(index, 1);
                return usersArray;
                }
            }
            if (option === 'Add'){
                usersArray.push(userId);
                return usersArray;
            }
        }
    }else{
        
        usersArray.push(userId);
        return usersArray;  
    }
            
}


// Function to check if the user that is liking or disliking is in the array.
let exitsUser = function(usersArray, userId) {
    if(usersArray.length != 0){
        for (i = 0; i < usersArray.length; i ++){
            if(usersArray[i] === userId){
                return true;
            }
        }
        return false;
    }
}

let checkPhoneNumber = function(inputtxt){
    var phoneno = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    var arr = {conditional : false, message: ""};
        const coincidence = inputtxt.match(phoneno);
            if(coincidence){
                arr.conditional = true;
                return arr;
            } else {
                arr.message = "Phone number is not matching!";
                return arr;
            }
}


module.exports = {
    checkPhoneNumber,
    checkPassword,
    modifyArray,
    exitsUser,
};