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
        userid: "",
        colour: false,
        refreshTime: 60 * 10000,
        lightsorgroups: "groups",
        showOnlyOn: false,
        showLabel: true,
        hideSpecificGroups: false,
        hideGroupsWithString: 'hgrp'

    },
    // Define required scripts.
    getScripts: function () {
        return [this.file("js/jquery.js")];
    },
    getStyles: function () {

        return ["font-awesome.css", "MMM-Hue.css"];
    },
    // Define required translations.
    getTranslations: function() {
      return {
        'en': 'translations/en.json',
        'id': 'translations/id.json',
        'sv': 'translations/sv.json',
      };
    },
    // Define start sequence.
    start: function () {
        //These will be moved to config in a later release
        this.lightsorgroups = this.config.lightsorgroups;
        this.updateInterval = this.config.refreshTime; // updates every 10 minutes
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
	Log.info(JSON.stringify(this.result));
        if (this.result) {

            var table = document.createElement("table");
            table.classList.add("small", "table", "align-left");

            if (this.config.showLabel)
              table.appendChild(this.createLabelRow());

            var lamps = Object.keys(this.result);

            for (var i = 0; i < lamps.length; i++) {
                var groupName = this.result[lamps[i]].name;
                console.debug(groupName, groupName.includes('hgrp'));

                if (this.config.showOnlyOn) {
                    if (this.config.hideSpecificGroups && !groupName.includes(this.config.hideGroupsWithString)) {
                        if (this.result[lamps[i]].state.all_on || this.result[lamps[i]].state.any_on || this.result[lamps[i]].state.on) {
                            domAction(this.result,lamps[i],this.config);
                        }
                    } else if (!this.config.hideSpecificGroups) {
                        domAction(this.result,lamps[i],this.config);
                    }
                } else {
                    if (this.config.hideSpecificGroups && !groupName.includes(this.config.hideGroupsWithString)) {
                        domAction(this.result,lamps[i],this.config);
                    } else if (!this.config.hideSpecificGroups) {
                        domAction(this.result,lamps[i],this.config);
                    }
                }


            }

            function domAction(result, lamp, config) {
                var row = document.createElement("tr");
                var room = document.createElement("td");
                console.debug(result[lamp]);
                room.innerHTML = result[lamp].name;
                row.appendChild(room);
                var lightsallLabel = document.createElement("td");
                lightsallLabel.classList.add("centered");

                var lightstatus = document.createElement("i");
                lightstatus.classList.add("fa", (result[lamp].state.all_on || result[lamp].state.on) ? "fa-lightbulb-o" : (result[lamp].state.any_on ? "fa-adjust" : "fa-times"));
                if (config.colour) {

                    if (result[lamp].state.all_on||result[lamp].state.on) {
                        lightstatus.classList.add("lights-all-on")
                    }
                    else {
                        if (result[lamp].state.any_on) {
                            lightstatus.classList.add("lights-partial-on")
                        }
                    }
                }
                lightsallLabel.appendChild(lightstatus);
                row.appendChild(lightsallLabel);
                table.appendChild(row);
            }
            wrapper.appendChild(table);
        } else {
            wrapper.innerHTML = this.translate("NO_DATA");
            wrapper.className = "dimmed light small";
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
        typeIcon.innerHTML = this.translate("LIGHTS_ON");
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
