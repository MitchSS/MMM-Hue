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
        userid: "yz30VQP0rkQctt2ZKve-Aqa-NOCJqKRw35KGgh1K",
        lightsorgroups: "groups",
        updateInterval: 60 * 100, // updates every 10 minutes
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
        //var header = document.createElement("header");
        //header.classList.add("align-left");
        //var logo = document.createElement("i");
        //logo.classList.add("fa", "fa-lightbulb-o", "logo");
        //header.appendChild(logo);
        //var name = document.createElement("span");
        //name.innerHTML = this.translate("Hue Status");
        //header.appendChild(name);
        //wrapper.appendChild(header);

        if (this.result) {
            var table = document.createElement("table");
            
            for (var i = 0; i < this.result.length; i++) {
                alert(i.toString);
                var row = document.createElement("tr");
                var name = document.createElement("td");
                name.innerHTML = this.result[i].name;
                row.appendChild(name);
                table.appendChild(row);
            }
            wrapper.appendChild(table);
        } else {
            wrapper.innerHTML = "No Data returned";
        }
        return wrapper;
    },
//"http://" + this.config.bridgeip + "/api/" + this.config.userid + "/" + this.config.lightsorgroups
    getData: function () {
        $.getJSON("http://" + this.config.bridgeip + "/api/" + this.config.userid + "/" + this.config.lightsorgroups, (data) => {
            this.result = data;
            this.updateDom();
        });
    },
});
