/* global Module */

/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

Module.register("MMM-Hue", {

    // Default module config.
    defaults: {
        text: "MMM-Hue!",
        bridgeip: "192.168.1.2",
        userid: "",
        lightsorgroups: "groups",
        updateInterval: 60 * 10000, // updates every 10 minutes
        animationSpeed: 2 * 1000,
        initialLoadDelay: 0

    },
    // Define required scripts.
    getScripts: function () {
        return [this.file("js/jquery.js")];
    },
    getStyles: function () {
        return ["font-awesome.css"];
    },
    // Define start sequence.
    start: function () {
        
        var result = false;
        var url = "http://" + this.config.bridgeip + "/api/" + this.config.userid + "/" + this.config.lightsorgroups;
        this.getData();
        setInterval(() => {
            this.getData();
        }, this.config.updateInterval);
    },

    // Override dom generator.
    getDom: function () {
        var wrapper = document.createElement("div");

    
        if (this.result) {

            var table = document.createElement("table");
            table.classList.add("small", "table", "align-left");

            table.appendChild(this.createLabelRow());

            var lamps = Object.keys(this.result);

            for (var i = 0; i < lamps.length; i++) {
                var row = document.createElement("tr");

                var room = document.createElement("td");
                room.innerHTML = this.result[lamps[i]].name;;
                row.appendChild(room);
                //alert(this.result[lamps[i]].state.all_on ? "fa-lightbulb-o fa-lightbulb-o-all-on" : this.result[lamps[i]].state.all_on ? "fa-lightbulb-o" : "fa-times");
                var lightsall = document.createElement("td");
                lightsall.classList.add("fa", this.result[lamps[i]].state.all_on ? "fa-lightbulb-o" : "fa-times");
                row.appendChild(lightsall);

                var lightsany = document.createElement("td");
                lightsany.classList.add("fa", this.result[lamps[i]].state.any_on ? "fa-lightbulb-o" : "fa-times");

                row.appendChild(lightsany);

                table.appendChild(row);
                
            }
            wrapper.appendChild(table);
        } else {
            wrapper.innerHTML = "No Data returned";
        }
        return wrapper;
    },

    createLabelRow: function () {
        var labelRow = document.createElement("tr");

        var roomiconlabel = document.createElement("th");
        roomiconlabel.classList.add("centered");
        var typeIcon = document.createElement("room");
        typeIcon.classList.add("fa", "fa-home");
        roomiconlabel.appendChild(typeIcon);
        labelRow.appendChild(roomiconlabel);

        var lightsonlabel = document.createElement("th");
        lightsonlabel.classList.add("centered");
        var typeIcon = document.createElement("lightson");
        //typeIcon.classList.add("fa", "fa-lightbulb-o");
        typeIcon.innerHTML = "All";
        lightsonlabel.appendChild(typeIcon);
        labelRow.appendChild(lightsonlabel);

        var lightsonlabel = document.createElement("th");
        lightsonlabel.classList.add("centered");
        var typeIcon = document.createElement("lightson");
        //typeIcon.classList.add("fa", "fa-lightbulb-o");
        typeIcon.innerHTML = "Any";
        lightsonlabel.appendChild(typeIcon);
        labelRow.appendChild(lightsonlabel);

        return labelRow;
    }
,
//"http://" + this.config.bridgeip + "/api/" + this.config.userid + "/" + this.config.lightsorgroups
    getData: function () {
        $.getJSON("http://" + this.config.bridgeip + "/api/" + this.config.userid + "/" + this.config.lightsorgroups, (data) => {
            this.result = data;
            this.updateDom();
        });
    },
});
