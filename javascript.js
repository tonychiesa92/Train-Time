// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyCsJhgotAQuho4cRwW1uViLCfOF0qx65oc",
    authDomain: "train-time-352db.firebaseapp.com",
    databaseURL: "https://train-time-352db.firebaseio.com",
    projectId: "train-time-352db",
    storageBucket: "",
    messagingSenderId: "356400219655",
    appId: "1:356400219655:web:c3514f25e536b125"
};
// Initialize Firebase
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Capture Button Click
$("#add-train").on("click", function (event) {
    event.preventDefault();


    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train-time").val().trim();
    frequency = $("#frequency").val().trim();

    // Code for the push
    database.ref().push({

        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");


});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function (childSnapshot) {

    // full list of items to the well
    $(".train-info-here").append("<tr class='well'><td class='train-name'> " +
        childSnapshot.val().name +
        " </td><td class='destination'> " + childSnapshot.val().destination +
        " </td><td class='frequncy'> " + childSnapshot.val().frequency +
        " </td><td class='next-arrival'> " + nextArrival(childSnapshot.val().firstTrain, childSnapshot.val().frequency) +
        " </td><td class='minutes-away'> " + minutesToArrival(childSnapshot.val().firstTrain, childSnapshot.val().frequency) +
        " </td></tr>");

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});




function nextArrival(firstTime, tFrequency) {




    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    return moment(nextTrain).format("hh:mm a");
}


function minutesToArrival(firstTime, tFrequency) {


    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    return tMinutesTillTrain;
}


