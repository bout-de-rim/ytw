var testvalues = [
    {
        start: 1,
        note: "The Shawshank Redemption",
        duration: 1994
    }, {
        start: 2,
        note: "The Godfather",
        duration: 1972
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
                view: "button",
                value: "Play",
                width: 100,
                click: "player.play()"
            }, {
                view: "slider",
                title: webix.template("Speed: #value#"),
                value: "1",
                min: 0,
                max: 10,
                step: 0.01,
                name: "s1"
            }]
        }
    ]
};

var annotationblockui = {
    view: "datatable",
    select: true,
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
    data: testvalues
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
