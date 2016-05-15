var testvalues = [
    {
        start: 10,
        note: "Enrosque - side - side - ...",
        duration: 5
    }, {
        start: 25,
        note: "2d seq",
        duration: 10
    }
];

var playerui = {
    width: 800,
    rows: [
        {
            template: "Video",
            id: "video-placeholder",
            height: 500
        }, {
            view: "toolbar",
            id: "playercontrolbar",
            elements: [{
                id: "btplay",
                view: "button",
                label: "Play",
//                width: 100,
                autowidth: true,
                autoheight: true,
                click: "$$('btplay').label = player.playpause()"
            }, {
                id: "loopbox",
                view: "checkbox",
                labelRight: "Loop",
                labelWidth: 0,
//                width: 100,
                autowidth: true,
                autoheight: true,
//                disabled: true,
                click: 'player.loop=$$("loopbox").getValue()'
            }, {
                id: "speedslider",
                view: "slider",
                title: webix.template("Speed: #value#"),
                value: "1",
                min: 0,
                max: 10,
                step: 0.01,
                name: "s1",
                on: {
                    onChange: function (id) {
                        player.setSpeed($$("speedslider").getValue());
                        $$("speedslider").setValue(player.speed);
                        //                        $$("speedslider").refresh();
                    }
                }
            }]
        }
    ]
};

var annottoolbar = {
    view: "toolbar",
    //    type: "space",
    id: "annottoolbar",
    elements: [{
        view: "button",
        type: "prev",
        label: "Set A",
        width: 100,
        click: "player.setA()"
            }, {
        view: "button",
        type: "next",
        label: "Set B",
        width: 100,
        click: "player.setB()"
            }, {
        view: "button",
        label: "Save",
        width: 100,
        click: "player.play()"
            }]
};
var annotationsui = {
    id: "annotationsui",
    view: "datatable",
    select: "row",
    columns: [{
        id: "start",
        header: "Start at"
            }, {
        id: "note",
        header: "Description"
            }, {
        id: "duration",
        header: "Duration"
            }],
    data: testvalues,
    autowidth: true,
    on: {
        onAfterSelect: function (id) {
            player.pause();
            row = $$("annotationsui").getSelectedItem();
            player.seek(row.start);
            player.setA(row.start);
            player.setB(row.start+row.duration);
        }
    }
};
//$$("annotationsui").attachEvent("onAfterSelect",function(id){player.seek(id.start);});

var annotationblockui = {
    rows: [annottoolbar, annotationsui]
};
var otherdocui = {
    rows: [{
        template: "Others videos",
        type: "header"
    }, {
        view: "datatable",
        select: true
    }]
};

webix.ui({
    type: "space",
    //    width: 500,
    rows: [
        {
            template: "Youtube Workshop",
            type: "header"
        },
        {
            cols: [{
                rows: [playerui, annotationblockui]
            }, otherdocui]
        }
    ]
});

// Link the YT iframe to Webix by linking the webix's 'view-id' to a real DOM id.
$("div[view_id='video-placeholder'] > div")[0].id = 'video-placeholder';
