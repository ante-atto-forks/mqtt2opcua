var  mqtt2opc = require("../mqtt2opcua").run;
var  Events = require('events').EventEmitter;

forward = new Events();
backward = new Events();

// Set up forward and reverse data conversion functions
// These are based on topic path - the finer grained pattern will be used.
// Examples below

forward.on("json/nologging/Sweden/Uppsala/Evolar/EvCoolingSystem/ToScada/#", function(payload) {
    return {
            //dataType: "Int32",
            //value: parseInt(payload)
            dataType: "String",
            value: String(payload)
         };
});

backward.on("json/nologging/Sweden/Uppsala/Evolar/EvCoolingSystem/ToScada/#", function(variant) {
            return {
                topic:variant.topic,
                payload:variant.value
            };
});

options = {
    opcName:"/EvCoolingSystem",
    opcHost:"10.230.110.27",
    opcPort:4840,
    mqttHost:"10.230.110.133",
    mqttPort:"1883",
    mqttUsername:"",
    mqttPassword:"",
    debug:true,
    roundtrip:false,	// set to true to limit updates to onMessage (i.e. validate an accuator is set)
    forward:forward,	// data converter - mqtt -> opcua
    backward:backward,	// data converter - opcua -> mqtt
    topics:['json/nologging/Sweden/Uppsala/Evolar/EvCoolingSystem/ToScada/#'] // Customize to override. These are the default so uncessary.
};

var server = new mqtt2opc(options);


