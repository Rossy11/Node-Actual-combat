"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./node_modules/bootstrap/dist/css/bootstrap.min.css");
require("bootstrap");
document.body.innerHTML = "\n    <div class=\"container\">\n        <h1>B4-Book Bundler</h1>\n        <div class=\"b4-alerts\"></div>\n        <div class=\"b4-main\"></div>\n    </div>\n";
var mainElement = document.body.querySelector(".b4-main");
mainElement.innerHTML = "\n    <div class=\"jumbotron\">\n        <h1>welcome!</h1>\n        <p>B4 is an application for creating book bundles.</p>\n    </div>\n";
var alertsElement = document.body.querySelector(".b4-alerts");
alertsElement.innerHTML = "\n    <div class=\"alert alert-success alert-dismissable fade in\" role=\"alert\">\n        <button class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n        <strong>Success!</strong>Bootstrap is working.\n    </div>\n";
//# sourceMappingURL=entry.js.map