/* global Module */

/* Magic Mirror
 * Module: MMM-Hue
 *
 * By MitchSS
 * MIT Licensed.
 */

Module.register("MMM-Hue", {

    // Default module config.
    defaults: {
        bridgeip: "",
        userid: ""

    },
    // Define required scripts.
    getScripts: function () {
        return [this.file("js/jquery.js")];
    },
    getStyles: function () {

        return ["font-awesome.css", "MMM-Hue.css"];
    },
    // Define start sequence.
    start: function () {
        //These will be moved to config in a later release
        this.lightsorgroups = "groups";
        this.updateInterval = 60 * 10000; // updates every 10 minutes
        this.animationSpeed = 2 * 1000;
        this.initialLoadDelay = 0;
        //end
        var result = false;
        this.url = "http://" + this.config.bridgeip + "/api/" + this.config.userid + "/" + this.lightsorgroups;
        this.getData();
        setInterval(() => {
            this.getData();
        }, this.updateInterval);
    },

    // Override dom generator.
    getDom: function () {
        var wrapper = document.createElement("div");
        //alert("http://" + this.config.bridgeip + "/api/" + this.config.userid + "/" + this.config.lightsorgroups);

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
                var lightsallLabel = document.createElement("td");
                lightsallLabel.classList.add("centered");

                var lightstatus = document.createElement("i");
                lightstatus.classList.add("fa", this.result[lamps[i]].state.all_on ? "fa-lightbulb-o" : (this.result[lamps[i]].state.any_on ? "fa-adjust" : "fa-times"));
                if (this.result[lamps[i]].state.all_on) {
                    lightstatus.classList.add("lights-all-on")
                }
                else {
                    if (this.result[lamps[i]].state.any_on) {
                        lightstatus.classList.add("lights-partial-on")
                    }
                }
                ;
                lightsallLabel.appendChild(lightstatus);
                row.appendChild(lightsallLabel);

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
        var typeIcon = document.createElement("room");
        typeIcon.classList.add("fa", "fa-home");
        roomiconlabel.appendChild(typeIcon);
        labelRow.appendChild(roomiconlabel);

        var lightsonlabel = document.createElement("th");
        lightsonlabel.classList.add("centered");
        var typeIcon = document.createElement("lightson");
        //typeIcon.classList.add("fa", "fa-lightbulb-o");
        typeIcon.innerHTML = "Lights On";
        lightsonlabel.appendChild(typeIcon);
        labelRow.appendChild(lightsonlabel);

        var lightsonlabel = document.createElement("th");
        lightsonlabel.classList.add("centered");

        return labelRow;
    }
    ,
    getData: function () {
        $.getJSON(this.url, (data) => {
            this.result = data;
            this.updateDom();
        });
    },
});
