"use strict";

const _log = console.log;

console.log = function() {
    _auto(arguments);
    return _log.apply(console, arguments);
};

let toListen = [
    "changes",
    "audioCompleteHandler",
    "QuizDirective",
    "this.model.isAudioCompleted()",
    "doc",
    "this.savesInQueue",
];

let _auto = (args) => {
    const catched = args[0] && typeof args[0] === "string" && toListen.includes(args[0].split(" ")[0])

    if (catched) {
        _log("--> auto", "possible action detected, wait the UI", args[0]);
		setTimeout(() =>  {
			if (!document.getElementById("btn-agree").disabled) {
                _log("--> auto", "found: agree");
                document.getElementById("btn-agree").click();
            } else if (!document.getElementById("next-btn").disabled) {
                _log("--> auto", "found: next");
                document.getElementById("next-btn").click();
			} else if (document.querySelector('.option-con.enabled:not(.visited):not(.selected)')) {
                _log("--> auto", "found: option to click");
				setTimeout(() => document.querySelector(".option-con.enabled:not(.visited):not(.selected)").click());
			} else if (document.querySelector(".btn.resource-btn.btn-primary")) {
                _log("--> auto", "found: document to click");
				setTimeout(() => document.querySelector(".btn.resource-btn.btn-primary").click());
			} else {
				_log("--> auto", "nothing found");
			}
		});
	} else {
		_log("--> auto", "NO next step detected", args);
	}
};
