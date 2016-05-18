var playerui = {
    width: 800,
    rows: [
        {
            template: "Video",
            id: "video-placeholder",
//            height: 500
        }, {
            view: "toolbar",
            id: "playercontrolbar",
            minHeight: 40,
            maxHeight: 40,
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

function save() {
    $$("annotationsui").add({
        start: player.pointa,
        note: "",
        duration: player.pointb - player.pointa
    })
};
var annottoolbar = {
    view: "toolbar",
    //    type: "space",
    id: "annottoolbar",
    elements: [{
        id: "btA",
        view: "button",
//        type: "prev",
        label: "Set A",
        width: 100,
        click: "player.setA()",
//        badge: 1,
            }, {
        id: "btB",
        view: "button",
//        type: "next",
        label: "Set B",
        width: 100,
        click: "player.setB()"
            }, {
        view: "button",
        label: "Save",
        width: 100,
        //        popup: "coming",
        click: "save()"
            }]
};
var annotationsui = {
    id: "annotationsui",
    view: "datatable",
    select: "row",
    editable: true,
    columns: [{
        id: "start",
        editor: "text",
        header: "Start at"
            }, {
        id: "note",
        editor: "text",
        header: "Description"
            }, {
        id: "duration",
        editor: "text",
        header: "Duration"
            }],
//    data: testvalues,
    autowidth: true,
    on: {
        onAfterSelect: function (id) {
            player.pause();
            row = $$("annotationsui").getSelectedItem();
            player.seek(row.start);
            player.setA(row.start);
            player.setB(row.start + row.duration);
        }
    },
    save: "cache->testvalues.json",
    url: "cache->testvalues.json",
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
var impexui = {
    view: "toolbar",
    elements: [
        {
            view: "button",
            label: "Export",
            popup: "coming"
        },
        {
            view: "button",
            label: "Import",
            popup: "coming"
        }
    ]
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
                rows: [playerui, {view: "resizer"}, annotationblockui]
            }, {
                rows: [impexui, otherdocui]
            }]
        }
    ]
});
webix.ui({
    view: "popup",
    id: "coming",
    autofit: true,
    body: {
        template: "Coming soon!"
    }
}).hide();

// Link the YT iframe to Webix by linking the webix's 'view-id' to a real DOM id.
$("div[view_id='video-placeholder'] > div")[0].id = 'video-placeholder';
